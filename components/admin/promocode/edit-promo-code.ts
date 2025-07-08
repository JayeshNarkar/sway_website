"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function editPromoCode(
  id: number,
  code: string,
  discount: number,
  isActive: boolean
) {
  if (code.length <= 0) {
    return { success: false, message: "Promo code cannot be empty" };
  }
  if (discount <= 0) {
    return { success: false, message: "discount cannot be less than 1%" };
  }
  if (discount > 50) {
    return { success: false, message: "discount cannot be more than 50%" };
  }
  try {
    await prisma.promoCode.update({
      where: {
        id,
      },
      data: {
        code,
        discount,
        isActive,
      },
    });
    revalidatePath("/admin/products");
    return true;
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to edit" };
  }
}
