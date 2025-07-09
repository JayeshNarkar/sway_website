import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function checkIfLaunched(
  launchDate: { launchAt: Date; timezone?: string | null } | null
) {
  if (!launchDate) return true;

  const session = await getServerSession(authOptions);
  if (session?.user.isAdmin) return true;

  const now = new Date();
  const launchAt = new Date(launchDate.launchAt);

  if (launchDate.timezone) {
    const currentTimeInTZ = new Date(
      now.toLocaleString("en-US", { timeZone: launchDate.timezone })
    );

    const launchTimeInTZ = new Date(
      launchAt.toLocaleString("en-US", { timeZone: launchDate.timezone })
    );

    return currentTimeInTZ >= launchTimeInTZ;
  }

  return now >= launchAt;
}
