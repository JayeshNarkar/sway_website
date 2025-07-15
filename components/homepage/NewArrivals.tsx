"use client";
import { Product } from "@/lib/prisma";
import { motion } from "framer-motion";
import ProductItem from "./ProductItem";

function NewArrivals({ products }: { products: Product[] }) {
  return (
    <div className="w-full bg-gray-50 py-6 border-t-2 border-gray-500">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2 className="font-semibold text-2xl md:text-3xl text-gray-700 inline-block relative pb-1">
          New Arrivals
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-500 origin-left"
          />
        </h2>
      </motion.div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mb-4">
        {products.map((product, index) => (
          <ProductItem product={product} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
