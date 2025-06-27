"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/prisma";
import Link from "next/link";

interface ProductViewClientProps {
  product: Product;
}

export default function ProductViewClient({ product }: ProductViewClientProps) {
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
    <div className="w-full md:w-1/3 lg:pl-10">
      <p className="text-lg text-gray-600 mb-2 font-semibold">
        {product.categoryName}
      </p>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
      <div className="flex items-center space-x-4 mb-4">
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
          <Button className="text-lg" disabled>
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
            <Button className="text-lg text-white" onClick={() => {}}>
              Buy Now
            </Button>
          </Link>
        )
      ) : (
        <Button className="text-lg" disabled>
          Select a Size
        </Button>
      )}
    </div>
  );
}
