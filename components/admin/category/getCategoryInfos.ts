import { prisma } from "@/lib/prisma";

export default async function getCategoryInfos() {
  const categoryInfos = await prisma.categoryInfo.findMany();
  return categoryInfos;
}
