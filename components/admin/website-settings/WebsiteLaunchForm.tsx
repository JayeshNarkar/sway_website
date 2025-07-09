"use client";

import { useActionState, useState, useEffect } from "react";
import { submitLaunchTime } from "@/components/admin/website-settings/set-website-launch";
import { WebsiteLaunch } from "@prisma/client/edge";

interface FormState {
  success: boolean;
  message: string;
  errors?: {
    launchAt?: string;
  };
}

export default function WebsiteLaunchForm({
  launchDate,
}: {
  launchDate: WebsiteLaunch | null;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    submitLaunchTime,
    {
      success: false,
      message: "",
    }
  );

  const [launchAt, setLaunchAt] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (launchDate?.launchAt) {
      const date = new Date(launchDate.launchAt);

      const localDatetime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);
      setLaunchAt(localDatetime);
    } else {
      const now = new Date();
      const localDatetime = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 16);
      setLaunchAt(localDatetime);
    }
    setIsLoading(false);
  }, [launchDate]);

  if (isLoading) {
    return <div className="w-80 h-12 bg-gray-100 rounded-md animate-pulse" />;
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <input
          type="datetime-local"
          id="launchAt"
          name="launchAt"
          value={launchAt}
          onChange={(e) => setLaunchAt(e.target.value)}
          min={new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
          )
            .toISOString()
            .slice(0, 16)}
          className="mt-1 block w-full lg:w-80 rounded-md border border-gray-300 p-2 shadow-sm disabled:opacity-50"
          required
          disabled={isPending}
        />
        {state?.errors?.launchAt && (
          <p className="mt-1 text-sm text-red-600">{state.errors.launchAt}</p>
        )}
      </div>

      <input type="hidden" name="timezone" value="Asia/Kolkata" />

      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "Scheduling..." : "Schedule Launch"}
      </button>

      {state.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
