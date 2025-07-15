"use client";

import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/prisma";
import getCldName from "@/lib/getCldName";

export default function ProductItem({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const cldName = getCldName();
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 1, delay: index * 0.1 }}
    >
      <Link
        className="flex flex-col items-center border border-gray-200 rounded-lg p-2 transition-all shadow-md hover:border-gray-300 bg-white relative"
        href={"/products/" + product.id}
      >
        {product.images && product.images.length > 0 ? (
          <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg">
            {product.originalPrice != -1 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10 lg:text-sm">
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                % OFF
              </div>
            )}
            <img
              src={getCloudinaryImageUrl(product.images[0], cldName)}
              alt={product.name}
              className="w-full h-full object-contain absolute inset-0 hover:scale-110 transition-transform duration-300"
            />
            {product.images[1] && (
              <img
                src={getCloudinaryImageUrl(product.images[1], cldName)}
                alt={product.name}
                className="w-full h-full object-contain absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
        ) : (
          <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <div className="mt-4 text-center">
          <p className="text-lg text-gray-800">{product.name}</p>
          {product.originalPrice !== -1 ? (
            <div className="flex items-center justify-center space-x-2">
              <p className="text-lg text-gray-600 font-semibold">
                ₹{product.price}
              </p>
              <p className="text-lg text-gray-500 line-through">
                ₹{product.originalPrice}
              </p>
            </div>
          ) : (
            <p className="text-lg text-gray-600">₹{product.price}</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
