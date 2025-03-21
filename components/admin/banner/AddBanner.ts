"use server";
import { uploadToCloudinary } from "@/components/admin/products/AddProduct";
import { prisma } from "@/lib/prisma";

async function AddBanner(url: string, image: File) {
  try {
    const { public_id } = await uploadToCloudinary(image);
    const createdImage = await prisma.image.create({
      data: {
        url: public_id,
      },
    });

    await prisma.banner.create({
      data: {
        url: url,
        imageId: createdImage.id,
      },
    });

    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error in creating banner",
    };
  }
}

export { AddBanner };
