"use server";

import { transporter } from "@/lib/nodemailer/transporter";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markOrderConfirmed(
  txnId: string,
  paymentInformationId: number | null,
  orderId: string,
  trackingNumber: string
) {
  try {
    if (!paymentInformationId) {
      throw new Error("Payment information ID is required");
    }
    if (!orderId) {
      throw new Error("Order ID is required");
    }
    if (!txnId?.trim() || txnId.trim().length <= 5) {
      throw new Error(
        "A valid transaction ID (minimum 6 characters) is required"
      );
    }

    if (!trackingNumber?.trim() || trackingNumber.trim().length <= 5) {
      throw new Error(
        "A valid tracking number (minimum 6 characters) is required"
      );
    }

    const result = await prisma.$transaction(async (prisma) => {
      const paymentInfo = await prisma.paymentInformation.update({
        where: { id: paymentInformationId },
        data: { txnId },
        include: { user: true },
      });

      const deliveryInformation = await prisma.deliveryInformation.create({
        data: {
          trackingNumber,
        },
      });

      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "confirmed",
          deliveryInformationId: deliveryInformation.id,
        },
        include: {
          product: true,
          size: true,
          address: true,
        },
      });

      return { paymentInfo, order };
    });

    const emailContent = `
      Your Order #${result.order.id} has been confirmed!

      Order Details:
      - Product: ${result.order.product.name}
      - Size: ${result.order.size.name}
      - Total Amount: ₹${result.order.totalPrice}
      - Transaction ID: ${txnId}

      Your order will be prepared, packaged, and shipped soon. 
      You'll receive another email with tracking information once shipped.

      Thank you for shopping with us!
    `;

    await new Promise((resolve) => {
      transporter.sendMail(
        {
          from: `"Sway" <${process.env.EMAIL_USER}>`,
          to: result.paymentInfo.user.email,
          subject: `Sway - Order #${result.order.id} payment Confirmed!`,
          text: emailContent,
          html: `
          <h1>Your Order #${result.order.id} payment has been confirmed!</h1>
          <h2>Order Details:</h2>
          <ul>
            <li><strong>Product:</strong> ${result.order.product.name}</li>
            <li><strong>Size:</strong> ${result.order.size.name}</li>
            <li><strong>Total Amount:</strong> ₹${result.order.totalPrice}</li>
            <li><strong>Transaction ID:</strong> ${txnId}</li>
          </ul>
          <p>Your order will be prepared, packaged, and shipped soon.</p>
          <p>You'll receive another email with tracking information once shipped.</p>
          <p>Thank you for shopping with us!</p>
        `,
        },
        (error, info) => {
          if (error) {
            console.log(error);
            return {
              message: "error in sending email occured",
            };
          } else {
            console.log("Email sent:", info.response);
            resolve(info);
          }
        }
      );
    });

    revalidatePath("/admin/orders");
    return { success: true, message: "Order confirmed successfully" };
  } catch (error) {
    console.error("Error in markOrderConfirmed:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
