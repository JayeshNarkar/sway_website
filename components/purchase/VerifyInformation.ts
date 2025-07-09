"use server";

import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import validateProduct from "@/components/purchase/validateProduct";
import { PaymentMethod, prisma } from "@/lib/prisma";
import { checkPromoCode } from "@/components/purchase/check-promo-code";
import { cleanupTempOrders } from "@/lib/cleanupTempOrders";

type ExistingAddress = {
  id: number;
};

type NewAddress = {
  flatAndBuilding: string;
  street: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
};

async function verifyInformation(
  id: number,
  size: string,
  paymentMethod: PaymentMethod,
  promoCode: string | null,
  number: string,
  addressData: ExistingAddress | NewAddress
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  const { isValid, priceAdjustment } = await validateProduct(Number(id), size);

  if (!isValid) {
    return {
      status: 409,
      message: "Product out of stock or does not exist",
    };
  }

  if (!/^\d{10}$/.test(number)) {
    return {
      status: 400,
      message: "Phone number must be exactly 10 digits",
    };
  }

  if (!("id" in addressData)) {
    const pincode = addressData.pincode.trim();

    if (!pincode) {
      return {
        status: 400,
        message: "Pincode is required",
      };
    }

    if (!/^\d{6}$/.test(pincode)) {
      return {
        status: 400,
        message: "Pincode must be exactly 6 digits",
      };
    }
    if (!addressData.flatAndBuilding) {
      return { status: 400, message: "Flat/Building is required" };
    }
    if (!addressData.street) {
      return { status: 400, message: "Street is required" };
    }
    if (!addressData.pincode) {
      return { status: 400, message: "Pincode is required" };
    }
    if (!addressData.city) {
      return { status: 400, message: "City is required" };
    }
    if (!addressData.state) {
      return { status: 400, message: "State is required" };
    }
    if (!addressData.country) {
      return { status: 400, message: "Country is required" };
    }

    const MAX_LENGTH = 100;
    if (addressData.flatAndBuilding.length > MAX_LENGTH) {
      return { status: 400, message: "Flat/Building is too long" };
    }
    if (addressData.street.length > MAX_LENGTH) {
      return { status: 400, message: "Street is too long" };
    }
    if (addressData.city.length > MAX_LENGTH) {
      return { status: 400, message: "City is too long" };
    }
    if (addressData.state.length > MAX_LENGTH) {
      return { status: 400, message: "State is too long" };
    }
    if (addressData.country.length > MAX_LENGTH) {
      return { status: 400, message: "Country is too long" };
    }

    if (!/^\d{6}$/.test(addressData.pincode)) {
      return { status: 400, message: "Pincode must be exactly 6 digits" };
    }
  }

  if (paymentMethod != "upi") {
    return {
      status: 500,
      message: "Invalid payment method",
    };
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email as string },
  });

  if (!product || !user) {
    return {
      status: 404,
      message: "Product or user not found",
    };
  }

  let totalPrice = product.price + (priceAdjustment || 0);

  if (promoCode) {
    const checkResponse = await checkPromoCode(promoCode);
    if (checkResponse.success) {
      totalPrice -= Math.round(product.price * (checkResponse.discount / 100));
    }
  }

  const addressId =
    "id" in addressData
      ? addressData.id
      : (
          await prisma.address.create({
            data: {
              userId: user.id,
              flatAndBuilding: addressData.flatAndBuilding,
              street: addressData.street,
              city: addressData.city,
              pincode: addressData.pincode,
              state: addressData.state,
              country: addressData.country,
            },
          })
        ).id;

  const sizeRecord = await prisma.size.findFirst({
    where: {
      name: size,
      categoryId: product.category?.id,
    },
  });

  if (!sizeRecord) {
    return {
      status: 400,
      message: "Invalid size for this product category",
    };
  }

  const order = await prisma.order.create({
    data: {
      status: "temp",
      totalPrice,
      userId: user.id,
      productId: product.id,
      sizeId: sizeRecord.id,
      addressId,
      contactId: (
        await prisma.contact.upsert({
          where: { userId_number: { userId: user.id, number } },
          create: { userId: user.id, number },
          update: {},
        })
      ).id,
      paymentMethod,
      promoCodeId: promoCode
        ? (
            await prisma.promoCode.findUnique({ where: { code: promoCode } })
          )?.id
        : null,
    },
  });

  return {
    orderId: order.id,
    status: 200,
    message: "Information verified!",
  };
}

export { verifyInformation };
