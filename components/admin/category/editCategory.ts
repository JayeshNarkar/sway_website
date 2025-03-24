"use server";
import { prisma } from "@/lib/prisma";

interface SizeUpdate {
  id?: number;
  name: string;
  priceAdjustment: number;
}

async function editCategory(categoryId: number, sizes: SizeUpdate[]) {
  try {
    const updatedSizes = await Promise.all(
      sizes.map(async (size) => {
        if (size.id === -1 || size.id === undefined) {
          const newSize = await prisma.size.create({
            data: {
              name: size.name,
              priceAdjustment: size.priceAdjustment,
              categoryId: categoryId,
            },
          });
          return newSize.id;
        } else {
          await prisma.size.update({
            where: { id: size.id },
            data: {
              name: size.name,
              priceAdjustment: size.priceAdjustment,
            },
          });
          return size.id;
        }
      })
    );

    await prisma.size.deleteMany({
      where: {
        categoryId,
        id: { notIn: updatedSizes },
      },
    });

    return {
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to update category sizes",
    };
  }
}

async function deleteCategory(categoryId: number) {
  try {
    await prisma.category.delete({
      where: { id: categoryId },
    });

    return {
      status: 200,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Failed to delete category",
    };
  }
}

export { editCategory, deleteCategory };
