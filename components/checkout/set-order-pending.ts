"use server";

import authOptions from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function setOrderPending(orderId: string) {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email as string,
    },
  });

  if (!user) return;

  await prisma.order.update({
    where: {
      userId: user.id,
      id: orderId,
      status: "temp",
    },
    data: {
      status: "pending",
    },
  });
}
