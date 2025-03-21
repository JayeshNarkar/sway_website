import { prisma } from "@/lib/prisma";

async function getNewProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
    include: {
      images: true,
    },
  });
  return products;
}
export default getNewProducts;
