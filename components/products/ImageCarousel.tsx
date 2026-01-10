"use client";

import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import { Image } from "@/lib/prisma";
import { useState } from "react";

interface ImageCarouselProps {
  images: Image[];
  cldName: string;
}

function ImageCarousel({ images, cldName }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    } else if (direction === "right") {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : images.length - 1
      );
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">No Image Available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="relative w-full overflow-hidden rounded-lg justify-center content-center flex"
        onTouchStart={(e) => {
          const touchStartX = e.touches[0].clientX;
          const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchEndX < touchStartX) {
              handleSwipe("left");
            } else if (touchEndX > touchStartX) {
              handleSwipe("right");
            }
            document.removeEventListener("touchend", handleTouchEnd);
          };
          document.addEventListener("touchend", handleTouchEnd);
        }}
      >
        {images.map((image, index) => (
          <img
            key={image.url}
            src={getCloudinaryImageUrl(image, cldName, true)}
            alt={`Image ${index + 1}`}
            className={`self-center w-auto h-[440px] object-contain rounded-lg transition-transform duration-300 lg:h-[550px] lg:w-auto ${
              index === currentImageIndex ? "block" : "hidden"
            }`}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentImageIndex ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
