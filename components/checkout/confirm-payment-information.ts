"use server";
import { setOrderPending } from "@/components/checkout/set-order-pending";
import authOptions from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function confirmPaymentInformation(
  customersUPiId: string,
  orderId: string
) {
  if (customersUPiId.trim().length == 0) {
    return {
      message: "Enter UPI ID.",
      valid: false,
    };
  }

  if (!customersUPiId.includes("@")) {
    return {
      message: "Invalid UPI ID format. A valid UPI ID must contain '@'",
      valid: false,
    };
  }

  const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
  if (!upiPattern.test(customersUPiId)) {
    return {
      message:
        "Invalid UPI ID format. Please enter a valid UPI ID (e.g., name@upi)",
      valid: false,
    };
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return {
      message: "Session invalid or expired. Please log in again.",
      valid: false,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return {
        message: "User not found",
        valid: false,
      };
    }

    const existingOrder = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: user.id,
      },
    });

    if (!existingOrder) {
      return {
        message: "Order not found or doesn't belong to this user",
        valid: false,
      };
    }

    if (existingOrder.paymentInformationId) {
      return {
        message: "Payment information already submitted for this order",
        valid: false,
      };
    }

    const paymentInfo = await prisma.paymentInformation.create({
      data: {
        userId: user.id,
        upiId: customersUPiId.trim(),
      },
    });

    await prisma.order.update({
      where: {
        id: orderId,
        userId: user.id,
      },
      data: {
        paymentInformationId: paymentInfo.id,
      },
    });

    await setOrderPending(orderId);

    return {
      message: "Payment information submitted successfully",
      valid: true,
    };
  } catch (error) {
    console.error("Payment confirmation error:", error);
    return {
      message: "An error occurred while processing your payment information",
      valid: false,
    };
  }
}

export { confirmPaymentInformation };
