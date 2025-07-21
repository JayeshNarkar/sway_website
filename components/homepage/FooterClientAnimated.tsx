"use client";

import { motion } from "framer-motion";

export default function AnimatedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="flex items-center"
    >
      <motion.p className="p-4 font-bold jacquard text-3xl border-r-2 border-gray-500">
        Sway
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="ml-4 text-white text-base"
      >
        Wear The Chaos
      </motion.p>
    </motion.div>
  );
}
