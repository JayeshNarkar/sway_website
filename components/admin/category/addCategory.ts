"use server";
import { prisma } from "@/lib/prisma";

async function addCategory(name: string, sizes: string[]) {
  try {
    await prisma.category.create({
      data: {
        name,
        sizes: {
          create: sizes.map((size) => ({
            name: size,
            priceAdjustment: 0,
          })),
        },
      },
    });

    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Category already exists... Or some other error idk",
    };
  }
}

export { addCategory };
