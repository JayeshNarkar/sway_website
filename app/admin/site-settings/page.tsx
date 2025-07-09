import WebsiteLaunchForm from "@/components/admin/website-settings/WebsiteLaunchForm";
import { prisma } from "@/lib/prisma";

export default async function SiteSettings() {
  const launchDate = await prisma.websiteLaunch.findUnique({
    where: { id: 1 },
  });

  return (
    <div className="w-full min-h-screen mt-[64px] p-4">
      <h2 className="text-xl font-semibold mb-4">
        Set Website Launch Date and Time
      </h2>
      <WebsiteLaunchForm launchDate={launchDate} />
    </div>
  );
}
