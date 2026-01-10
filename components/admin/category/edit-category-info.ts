"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveCategoryInfo(
  categoryId: number,
  infoLines: string[]
) {
  try {
    if (!categoryId || typeof categoryId !== "number") {
      return { success: false, message: "Invalid category id" };
    }

    if (!Array.isArray(infoLines)) {
      return { success: false, message: "Invalid info payload" };
    }

    const lines = infoLines
      .map((s) => (typeof s === "string" ? s.trim() : ""))
      .filter((s) => s.length > 0);

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      return { success: false, message: "Category not found" };
    }

    if (lines.length === 0) {
      // If no lines provided, remove CategoryInfo if exists
      await prisma.categoryInfo.deleteMany({ where: { categoryId } });
      revalidatePath("/admin/products");
      revalidatePath("/catalogue");
      revalidatePath("/");
      return { success: true, message: "Cleared category information" };
    }

    await prisma.categoryInfo.upsert({
      where: { categoryId },
      update: { info: lines },
      create: { categoryId, info: lines },
    });

    revalidatePath("/admin/products");
    revalidatePath("/catalogue");
    revalidatePath("/");
    return { success: true, message: "Category information saved" };
  } catch (err) {
    console.error("saveCategoryInfo error", err);
    return { success: false, message: "Failed to save category info" };
  }
}

export async function removeCategoryInfo(categoryId: number) {
  try {
    if (!categoryId || typeof categoryId !== "number") {
      return { success: false, message: "Invalid category id" };
    }
    await prisma.categoryInfo.deleteMany({ where: { categoryId } });
    revalidatePath("/admin/products");
    revalidatePath("/catalogue");
    revalidatePath("/");
    return { success: true, message: "Category information removed" };
  } catch (err) {
    console.error("removeCategoryInfo error", err);
    return { success: false, message: "Failed to remove category info" };
  }
}
