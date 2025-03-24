"use server";

import { prisma } from "@/lib/prisma";

async function productFetchWithStock() {
  return await prisma.product.findMany({
    include: {
      images: true,
      stock: true,
    },
  });
}
async function productFetch() {
  return await prisma.product.findMany({
    include: {
      images: true,
    },
  });
}

async function viewsProductFetch() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      views: true,
    },
  });

  const productsWithTotalViews = products.map((product) => {
    const totalViews = product.views.reduce((sum, view) => sum + view.count, 0);
    return {
      ...product,
      totalViews,
    };
  });

  const sortedProducts = productsWithTotalViews.sort(
    (a, b) => b.totalViews - a.totalViews
  );

  return sortedProducts;
}

export { productFetch, viewsProductFetch, productFetchWithStock };
