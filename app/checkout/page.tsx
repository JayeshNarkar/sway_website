import CheckoutPage from "@/components/checkout/CheckoutPage";
import authOptions from "@/lib/authOptions";
import { cleanupTempOrders } from "@/lib/cleanupTempOrders";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Purchase({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await cleanupTempOrders();
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  const { id } = await searchParams;
  if (!id || Array.isArray(id)) redirect("/");

  const order = await prisma.order.findFirst({
    where: {
      id,
      userId: (
        await prisma.user.findFirst({
          where: {
            email: session.user.email as string,
          },
        })
      )?.id,
    },
    include: {
      product: {
        include: {
          images: true,
        },
      },
      size: true,
      paymentInformation: true,
    },
  });

  if (!order) {
    return (
      <div className="w-full min-h-screen text-center items-center flex content-center justify-center">
        <p>Place another order. As order of this id does not exist</p>
      </div>
    );
  }

  if (order.paymentMethod == "upi") {
    return <CheckoutPage order={order} />;
  } else {
    return (
      <div className="min-h-screen w-full bg-gray-500 flex flex-col items-center justify-center p-4 font-minecraft">
        <div className="bg-[#2d2d2d] border-4 border-t-[#a3a3a3] border-l-[#a3a3a3] border-r-[#4a4a4a] border-b-[#4a4a4a] p-4 mb-8 w-full max-w-2xl">
          <h1 className="text-3xl text-[#ff5555] mb-2">⚠️ Order Error!</h1>

          <div className="bg-black bg-opacity-70 p-4 border-2 border-[#555555] text-left">
            <p className="text-xl text-white">
              <span className="text-[#aaaaaa]">[System] </span>
              <span>Wrong payment method: </span>
              <strong className="text-[#55ff55]">{order.paymentMethod}</strong>
            </p>
            <p className="text-lg text-[#ffaa00] mt-2">
              Try again with <span className="text-[#66ff55]">Emeralds</span> or{" "}
              <span className="text-[#ffaa00]">Gold</span>!
            </p>
          </div>
        </div>

        <div className="relative bg-[#2d2d2d] border-4 border-t-[#a3a3a3] border-l-[#a3a3a3] border-r-[#4a4a4a] border-b-[#4a4a4a] p-6 w-full max-w-md">
          <div className="flex justify-center">
            <div className="relative">
              <img
                alt="Achievement: How did we get here"
                src="https://hypixel.net/attachments/63cacee6-7a81-4007-af37-d27bf86ef118-jpeg.2694842/"
                className="h-32 object-contain pixelated"
              />
              <div className="absolute -bottom-3 -right-2 bg-[#555555] text-white px-2 py-1 text-sm rounded-md">
                ERROR: 418
              </div>
            </div>
          </div>

          <form
            className="flex justify-center gap-4 mt-6"
            action={async () => {
              "use server";
              redirect("/");
            }}
          >
            <button
              className="minecraft-button bg-[#5a5a5a] hover:bg-[#6a6a6a] p-2 rounded-md"
              type="submit"
            >
              Try Again
            </button>
          </form>
        </div>

        <p className="mt-8 text-black text-sm">
          © Not affiliated with Mojang or Microsoft
        </p>
      </div>
    );
  }
}
