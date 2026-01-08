"use server";
import { prisma } from "@/lib/prisma";

async function getAnnouncementMessages() {
  const messages = await prisma.announcementMessage.findMany({
    orderBy: {
      sortOrder: "asc",
    },
  });
  return messages;
}
export default getAnnouncementMessages;
