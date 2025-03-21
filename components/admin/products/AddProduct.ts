"use server";

import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma"; // Adjust the import path as needed
import { FormSchemaType } from "./ProductForm";
import { revalidatePath } from "next/cache";

const cld_api_key = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const cld_api_secret = process.env.CLOUDINARY_API_SECRET;
const cld_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

cloudinary.config({
  cloud_name: cld_name,
  api_key: cld_api_key,
  api_secret: cld_api_secret,
});

export async function uploadToCloudinary(file: File) {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "next_cloudinary_app");
  data.append("cloud_name", cld_name as string);

  const _res = await fetch(
    `https://api.cloudinary.com/v1_1/${cld_name}/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const res = await _res.json();
  return { public_id: res.public_id };
}

export async function onSubmit(values: FormSchemaType, images: File[]) {
  try {
    const parsedValues = {
      ...values,
      productName: values.productName.trim(),
      price: Number(values.price),
    };

    const uploadResults = await Promise.all(
      images.map((image) => uploadToCloudinary(image))
    );

    await prisma.product.create({
      data: {
        name: parsedValues.productName.trim(),
        price: parsedValues.price,
        category: parsedValues.category,
        images: {
          create: uploadResults.map((result) => ({
            url: result.public_id,
          })),
        },
      },
    });
    revalidatePath("/admin/products");
    return {
      status: 200,
      message: "Added successfully!",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error occurered. message admin :(",
    };
  }
}
