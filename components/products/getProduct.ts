"use server";
import { prisma } from "@/lib/prisma";

async function getProduct(id: number) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
      },
    });
    return product;
  } catch (error) {
    console.log(error);
  }
}

export { getProduct };
