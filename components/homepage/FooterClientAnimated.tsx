"use client";

import { motion } from "framer-motion";

export default function AnimatedHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="flex items-center"
    >
      <motion.p
        className="p-4 font-bold jacquard text-gray-900 text-3xl border-r-2 border-black"
        style={{ textShadow: "2px 2px 8px #363232" }}
      >
        Sway
      </motion.p>
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="ml-4 text-gray-800 text-base"
      >
        Wear The Chaos
      </motion.p>
    </motion.div>
  );
}
