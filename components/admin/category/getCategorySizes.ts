"use server";
import { prisma } from "@/lib/prisma";

async function getCategorySizes(categoryName: string) {
  try {
    const category = await prisma.category.findUnique({
      where: { name: categoryName },
      select: { sizes: true },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    return category.sizes;
  } catch (error) {
    console.error("Failed to fetch category sizes:", error);
    throw error;
  }
}

export { getCategorySizes };
