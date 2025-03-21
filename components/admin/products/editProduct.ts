"use server";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/components/admin/products/AddProduct";

async function addProductImage(file: File, id: number) {
  try {
    const { public_id } = await uploadToCloudinary(file);
    await prisma.image.create({
      data: {
        url: public_id,
        product: {
          connect: { id: id },
        },
      },
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error in adding image",
    };
  }
}

async function removeProductImage(imageId: number) {
  try {
    await prisma.image.delete({
      where: {
        id: imageId,
      },
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error in removing product image",
    };
  }
}

async function editProduct(
  id: number,
  formData: {
    setDiscount: boolean;
    name: string;
    price: number;
    category: string;
    originalPrice: number;
  }
) {
  if (formData.setDiscount && formData.originalPrice <= formData.price) {
    return {
      status: 500,
      message: "Original price must be greater than price",
    };
  }
  try {
    await prisma.product.update({
      where: {
        id: id,
      },
      data: {
        name: formData.name,
        price: formData.price,
        category: formData.category,
        originalPrice: formData.setDiscount ? formData.originalPrice : -1,
      },
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error in updating product",
    };
  }
}

async function backgroundRemoval(imageId: number, bgRemoval: boolean) {
  try {
    await prisma.image.update({
      where: {
        id: imageId,
      },
      data: {
        bgRemoval,
      },
    });
    return {
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Error updating background removal status",
    };
  }
}

export { editProduct, addProductImage, removeProductImage, backgroundRemoval };
