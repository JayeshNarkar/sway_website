import { prisma } from "@/lib/prisma";

export async function cleanupTempOrders() {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

  await prisma.order.deleteMany({
    where: {
      status: "temp",
      orderedAt: {
        lt: fifteenMinutesAgo,
      },
    },
  });
}
