"use server";
import { prisma } from "@/lib/prisma";

async function getBanners() {
  const banners = await prisma.banner.findMany({
    select: {
      id: true,
      url: true,
      image: {
        select: {
          url: true,
        },
      },
    },
  });

  return banners;
}

export { getBanners };
