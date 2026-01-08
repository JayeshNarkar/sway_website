import AnnouncementMessageEdit from "@/components/admin/website-settings/announcement-message-edit";
import WebsiteLaunchForm from "@/components/admin/website-settings/WebsiteLaunchForm";
import getAnnouncementMessages from "@/components/homepage/getAnnouncementMessages";
import { prisma } from "@/lib/prisma";

export default async function SiteSettings() {
  const launchDate = await prisma.websiteLaunch.findUnique({
    where: { id: 1 },
  });
  const messages = await getAnnouncementMessages();

  return (
    <div className="w-full min-h-screen pt-[78.8px] p-4">
      <h2 className="text-md font-bold mb-4">
        Set Website Launch Date and Time
      </h2>
      <WebsiteLaunchForm launchDate={launchDate} />
      <AnnouncementMessageEdit messages={messages} />
    </div>
  );
}
