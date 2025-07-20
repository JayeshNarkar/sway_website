"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CatalogueLink = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-8 text-center bg-gray-50"
    >
      <Link href="/catalogue" passHref>
        <motion.div
          className="inline-flex items-center group"
          whileHover={{
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.p className="text-lg md:text-xl text-gray-600 hover:text-gray-800 transition-all cursor-pointer font-medium group-hover:font-semibold">
            Browse the rest of our catalogue
          </motion.p>
          <motion.div
            className="ml-2"
            initial={{ x: 0 }}
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            whileHover={{
              x: 8,
              transition: { duration: 0.3 },
            }}
          >
            <ArrowRight
              className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors"
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CatalogueLink;
