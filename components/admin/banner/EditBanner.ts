"use server";

import { prisma } from "@/lib/prisma";

async function Editbanner(id: number, redirectUrl: string) {
  try {
    await prisma.banner.update({
      where: {
        id: id,
      },
      data: {
        url: redirectUrl,
      },
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error in editing banner",
    };
  }
}

async function RemoveBanner(id: number) {
  try {
    await prisma.banner.delete({
      where: {
        id: id,
      },
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error in removing banner",
    };
  }
}

export { Editbanner, RemoveBanner };
