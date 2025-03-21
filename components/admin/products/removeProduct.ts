"use server";

import { prisma } from "@/lib/prisma";

export async function removeProduct(id: number) {
  try {
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error in removing product",
    };
  }
}
