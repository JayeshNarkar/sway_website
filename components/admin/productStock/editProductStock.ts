"use server";
import { prisma } from "@/lib/prisma";

interface StockItem {
  sizeId: number;
  inStock: boolean;
}

async function updateProductStock(productId: number, stock: StockItem[]) {
  try {
    await Promise.all(
      stock.map((item) =>
        prisma.productStock.upsert({
          where: {
            productId_sizeId: {
              productId,
              sizeId: item.sizeId,
            },
          },
          update: {
            inStock: item.inStock,
          },
          create: {
            productId,
            sizeId: item.sizeId,
            inStock: item.inStock,
          },
        })
      )
    );

    return {
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to update product stock",
    };
  }
}

export { updateProductStock };
