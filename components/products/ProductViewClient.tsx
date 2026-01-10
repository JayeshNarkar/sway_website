"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/prisma";
import Link from "next/link";
import { CategoryInfo } from "@/components/admin/category/EditCategoryInfoFormClient";

interface ProductViewClientProps {
  product: Product;
  categoryInfo: CategoryInfo | undefined;
}

export default function ProductViewClient({
  product,
  categoryInfo,
}: ProductViewClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [adjustedPrice, setAdjustedPrice] = useState(product.price);

  const handleSizeClick = (
    size: string,
    inStock: boolean,
    priceAdjustment: number
  ) => {
    setSelectedSize(size);
    setIsOutOfStock(!inStock);
    setAdjustedPrice(product.price + priceAdjustment);
  };

  return (
    <div className="w-full flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-2 md:mb-0 md:pr-6">
        <p className="text-lg text-gray-600 font-semibold">
          {product.categoryName}
        </p>
        <h1 className="text-3xl font-bold text-gray-800 md:mb-2">
          {product.name}
        </h1>
        {categoryInfo && categoryInfo.info.length > 0 && (
          <ul className="space-y-3 hidden md:block">
            {categoryInfo.info.map((infoItem, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-600 mr-2">✮</span>
                <span className="text-gray-700">{infoItem}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="md:w-1/2">
        <div className="flex items-center space-x-4 mb-2">
          <p className="text-2xl text-gray-800 font-bold">₹{adjustedPrice}</p>
          {product.originalPrice !== -1 && (
            <p className="text-lg text-gray-500 line-through">
              ₹{product.originalPrice}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.stock?.map((stockItem) =>
            stockItem.size ? (
              <Button
                key={stockItem.sizeId}
                variant={
                  selectedSize === stockItem.size.name ? "default" : "outline"
                }
                className={`relative ${
                  !stockItem.inStock ? "line-through opacity-50" : ""
                }`}
                onClick={() => {
                  if (stockItem.size) {
                    handleSizeClick(
                      stockItem.size.name,
                      stockItem.inStock,
                      stockItem.size.priceAdjustment
                    );
                  }
                }}
              >
                {stockItem.size.name}
              </Button>
            ) : null
          )}
        </div>

        {selectedSize ? (
          isOutOfStock ? (
            <Button className="text-lg w-full md:w-auto" disabled>
              Out of Stock
            </Button>
          ) : (
            <Link
              href={{
                pathname: "/purchase",
                query: {
                  id: product.id,
                  size: selectedSize,
                },
              }}
            >
              <Button className="text-lg text-white w-full md:w-auto">
                Buy Now
              </Button>
            </Link>
          )
        ) : (
          <Button className="text-lg w-full md:w-auto" disabled>
            Select a Size
          </Button>
        )}
      </div>
      {categoryInfo && categoryInfo.info.length > 0 && (
        <ul className="space-y-3 block md:hidden pt-4">
          {categoryInfo.info.map((infoItem, index) => (
            <li key={index} className="flex items-start">
              <span className="text-gray-600 mr-2">✮</span>
              <span className="text-gray-700">{infoItem}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
