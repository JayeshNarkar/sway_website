"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function deleteOrder(orderId: string) {
  await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
  revalidatePath("/admin/orders");
}
