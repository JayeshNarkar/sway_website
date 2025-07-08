"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removePromoCode(id: number) {
  try {
    await prisma.promoCode.delete({
      where: {
        id,
      },
    });
    revalidatePath("/admin/products");
    return true;
  } catch (error) {
    return false;
  }
}
