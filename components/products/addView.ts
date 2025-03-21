"use server";

import authOptions from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";

async function addView(productId: number) {
  const rateLimitWindow = 2 * 60 * 1000;

  const session = await getServerSession(authOptions);

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user.email as string,
      },
    });
    const userId = user?.id;
    const lastView = await prisma.view.findFirst({
      where: {
        productId,
        userId,
      },
      orderBy: {
        viewedAt: "desc",
      },
    });
    if (lastView) {
      const timeSinceLastView = Date.now() - lastView.viewedAt.getTime();
      if (timeSinceLastView < rateLimitWindow) {
        return;
      }
      await prisma.view.update({
        where: {
          id: lastView.id,
        },
        data: {
          count: { increment: 1 },
          viewedAt: new Date(),
        },
      });
    } else {
      await prisma.view.create({
        data: {
          productId,
          userId,
          count: 1,
          viewedAt: new Date(),
        },
      });
    }
  } else {
    const headersList = await headers();
    const ipAddress =
      headersList.get("x-forwarded-for") || headersList.get("x-real-ip");

    if (!ipAddress) {
      console.log("Unable to track view: IP address not found");
      return;
    }

    const lastView = await prisma.view.findFirst({
      where: {
        productId,
        identifier: ipAddress,
      },
      orderBy: {
        viewedAt: "desc",
      },
    });

    if (lastView) {
      const timeSinceLastView = Date.now() - lastView.viewedAt.getTime();
      if (timeSinceLastView < rateLimitWindow) {
        return;
      }
      await prisma.view.update({
        where: {
          id: lastView.id,
        },
        data: {
          count: { increment: 1 },
          viewedAt: new Date(),
        },
      });
    } else {
      await prisma.view.create({
        data: {
          productId,
          identifier: ipAddress,
          count: 1,
          viewedAt: new Date(),
        },
      });
    }
  }
}

export { addView };
