"use server";

import { prisma } from "@/lib/prisma";

async function resetProductViews(productId: number) {
  try {
    await prisma.view.deleteMany({
      where: {
        productId,
      },
    });

    return { success: true, message: "Views reset successfully" };
  } catch (error) {
    console.error("Failed to reset views:", error);
    return { success: false, message: "Failed to reset views" };
  }
}

export default resetProductViews;
