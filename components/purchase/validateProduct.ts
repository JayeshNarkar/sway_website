"use server";

import { getProduct } from "@/components/products/getProduct";

export default async function validateProduct(id: number, size: string) {
  const product = await getProduct(id);

  if (!product) {
    return {
      isValid: false,
      priceAdjustment: 0,
    };
  }

  const sizeInStock = product.stock.find(
    (stockItem) => stockItem.size.name === size && stockItem.inStock
  );

  return {
    isValid: Boolean(sizeInStock),
    priceAdjustment: sizeInStock?.size.priceAdjustment,
  };
}
