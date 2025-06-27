"use server";

import authOptions from "@/lib/authOptions";
// import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import validateProduct from "@/components/purchase/validateProduct";

type Address = {
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
  number: string,
  address: Address
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  const { isValid, priceAdjustment } = await validateProduct(
    Number(id),
    size as string
  );

  if (!isValid) {
    return {
      status: 409,
      message: "Product out of stock or does not exist",
    };
  }

  // const user = await prisma.user.findUnique({
  //   where: {
  //     email: session?.user.email as string,
  //   },
  // });

  // const product = await prisma.product.findUnique({
  //   where: {
  //     id,
  //   },
  // });

  if (!/^\d{10}$/.test(number)) {
    return {
      status: 400,
      message: "Phone number must be exactly 10 digits",
    };
  }

  // Validate pincode (exactly 6 digits)
  if (!/^\d{6}$/.test(address.pincode)) {
    return {
      status: 400,
      message: "Pincode must be exactly 6 digits",
    };
  }

  return {
    status: 200,
    message: "Successfully created",
  };
}

export { verifyInformation };
