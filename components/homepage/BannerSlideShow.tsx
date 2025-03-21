"use client";
import React, { useState, useEffect, useRef } from "react";

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
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, isDragging]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      } else {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? banners.length - 1 : prevIndex - 1
        );
      }
      setIsDragging(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setStartX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      } else {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? banners.length - 1 : prevIndex - 1
        );
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (banners.length === 0) {
    return <div>No banners available</div>;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full flex justify-center items-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <a href={banners[currentIndex].url}>
        <img
          src={`https://res.cloudinary.com/${cldName}/image/upload/q_auto/f_auto/${
            isDesktop ? "c_pad,ar_16:5,g_center,b_gen_fill/" : ""
          }${banners[currentIndex].image.url}`}
          alt={`Banner ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
        />
      </a>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default BannerSlideShow;
