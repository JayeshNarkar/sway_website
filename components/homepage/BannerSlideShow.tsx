"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, PanInfo, useAnimation } from "framer-motion";

function BannerSlideShow({
  banners,
  cldName,
}: {
  banners: {
    image: {
      url: string;
    };
    url: string;
  }[];
  cldName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prevSlide();
    } else if (info.offset.x < -threshold) {
      nextSlide();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  if (banners.length === 0) {
    return <div>No banners available</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center items-center overflow-hidden"
    >
      <motion.div
        key={currentIndex}
        custom={1}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        className="w-full"
      >
        <a href={banners[currentIndex].url} className="block w-full">
          <motion.img
            src={`https://res.cloudinary.com/${cldName}/image/upload/q_auto/f_auto/${
              isDesktop
                ? "c_pad,ar_16:5,g_center,b_gen_fill/"
                : "c_pad,ar_4:5,g_center,b_gen_fill/"
            }${banners[currentIndex].image.url}`}
            alt={`Banner ${currentIndex + 1}`}
            className="w-full h-auto object-contain"
          />
        </a>
      </motion.div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default BannerSlideShow;
