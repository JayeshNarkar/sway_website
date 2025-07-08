"use server";

import { prisma } from "@/lib/prisma";

export async function checkPromoCode(code: string) {
  if (!code) {
    return { error: "Promo code is required" };
  }

  try {
    const promoCode = await prisma.promoCode.findUnique({
      where: { code },
    });

    if (!promoCode) {
      return { error: "Invalid promo code" };
    }

    if (!promoCode.isActive) {
      return { error: "This promo code is no longer valid" };
    }

    return {
      success: true,
      discount: promoCode.discount,
    };
  } catch (error) {
    console.error("Error checking promo code:", error);
    return { error: "An error occurred while checking the promo code" };
  }
}
