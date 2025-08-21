"use client";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";

type BannerSlideShowProps = {
  banners: {
    image: {
      url: string;
    };
    url: string;
  }[];
  cldName: string;
};

export default function BannerSlideShow({
  banners,
  cldName,
}: BannerSlideShowProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial screen size
    setIsDesktop(window.innerWidth >= 1024);

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    // Mark loading as complete after initial setup
    setIsLoading(false);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const interval = setInterval(() => {
      api?.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api, current, banners.length]);

  if (!banners || banners.length === 0) {
    return <div>No banners available {count}</div>;
  }

  return isLoading ? (
    <div className="w-full lg:aspect-[16/5] aspect-[4/5] bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <p className="font-bold text-xl">Loading...</p>
    </div>
  ) : (
    <Carousel
      setApi={setApi}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {banners.map((banner, index) => (
          <CarouselItem
            key={index}
            className="flex justify-center items-center pl-0"
          >
            <a href={banner.url} className="block w-full">
              <img
                src={`https://res.cloudinary.com/${cldName}/image/upload/q_auto/f_auto/${
                  isDesktop
                    ? "c_pad,ar_16:5,g_center,b_gen_fill/"
                    : "c_pad,ar_4:5,g_center,b_gen_fill/"
                }${banner.image.url}`}
                alt={`Banner ${index + 1}`}
                className="w-full h-auto object-contain"
              />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
