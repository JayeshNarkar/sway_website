"use server";
import { prisma } from "@/lib/prisma";

async function getCategory() {
  const categories = await prisma.category.findMany({});
  return categories;
}

async function getCategorySizes() {
  const categories = await prisma.category.findMany({
    include: {
      sizes: true,
    },
  });
  return categories;
}

export { getCategory, getCategorySizes };
