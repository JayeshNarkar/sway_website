"use client";
import * as React from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type BannerSlideShowProps = {
  banners: {
    image: {
      url: string;
    };
    url: string;
  }[];
  cldName: string;
};

const BannerSlideShow: React.FC<BannerSlideShowProps> = ({
  banners,
  cldName,
}) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      api?.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [api, current, banners.length]);

  if (!banners || banners.length === 0) {
    return <div>{count}No banners available</div>;
  }

  return (
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
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};

export default BannerSlideShow;
