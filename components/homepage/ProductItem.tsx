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
      transition={{ duration: 1, delay: index * 0.2 }}
    >
      <Link
        className="flex flex-col items-center rounded-lg p-2 transition-all shadow-md shadow-gray-500 hover:border-gray-300 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gray-300 to-slate-600 h-full hover:scale-105"
        href={"/products/" + product.id}
      >
        {product.images && product.images.length > 0 ? (
          <div className="w-full aspect-[4/5] relative overflow-hidden rounded-lg group">
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
              className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${
                product.images.length > 1
                  ? "group-hover:opacity-0"
                  : "hover:scale-105 transition-all"
              }`}
            />
            {product.images[1] && (
              <img
                src={getCloudinaryImageUrl(product.images[1], cldName)}
                alt={product.name}
                className="w-full h-full object-contain absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </div>
        ) : (
          <div className="w-full aspect-square lg:aspect-[3:4] bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image</span>
          </div>
        )}

        <div className="text-center">
          <p className="text-lg text-gray-800 font-bold">{product.name}</p>
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
            <p className="text-lg text-gray-600 font-semibold pb-2">
              ₹{product.price}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
