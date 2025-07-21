"use client";
import { motion } from "framer-motion";

export default function TextAnimated({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center my-6"
    >
      <h2 className="font-semibold text-2xl text-gray-200 inline-block relative pb-1">
        {text}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 origin-left"
        />
      </h2>
    </motion.div>
  );
}
