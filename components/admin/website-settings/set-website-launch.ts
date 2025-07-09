"use server";

import { prisma } from "@/lib/prisma";

type ServerActionResponse = {
  success: boolean;
  message: string;
  errors?: {
    launchAt?: string;
    timezone?: string;
  };
  data?: {
    id: number;
    launchAt: Date;
    timezone: string | null;
  };
};

export async function submitLaunchTime(
  prevState: ServerActionResponse | null,
  formData: FormData
): Promise<ServerActionResponse> {
  try {
    const launchAt = formData.get("launchAt");
    const timezone = formData.get("timezone") as string;

    if (!launchAt) {
      return {
        success: false,
        message: "Launch date is required",
        errors: { launchAt: "Please select a valid date and time" },
      };
    }

    const launchDate = new Date(launchAt.toString());

    const data = await prisma.websiteLaunch.upsert({
      where: { id: 1 },
      update: { launchAt: launchDate, timezone },
      create: { id: 1, launchAt: launchDate, timezone },
    });

    return {
      success: true,
      message: "Website launch scheduled successfully!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to schedule launch. Please try again.",
      errors: { launchAt: "An unexpected error occurred" },
    };
  }
}
