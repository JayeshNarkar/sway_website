"use server";
import authOptions from "@/lib/authOptions";
import { Image, prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import getCldName from "@/lib/getCldName";
import PurchaseForm from "@/components/purchase/PurchaseForm";
import PromoCodeDesktop from "@/components/purchase/promoCodeDesktop";

export default async function PurchaseView({
  id,
  size,
  priceAdjustment,
  promoCode,
}: {
  id: number;
  size: string;
  priceAdjustment: number;
  promoCode: string | undefined;
}) {
  const session = await getServerSession(authOptions);
  const cldName = getCldName();

  const addresses = await prisma.address.findMany({
    where: {
      userId: (
        await prisma.user.findUnique({
          where: {
            email: session?.user.email as string,
          },
        })
      )?.id,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      images: true,
    },
  });

  const totalPrice = (product?.price as number) + priceAdjustment;

  return (
    <div className=" flex-1 w-full min-h-screen lg:px-0 flex flex-col lg:flex-row p-4 lg:p-0 pt-[64px] lg:pt-[57.6px]">
      <div className="lg:w-1/2 lg:border-t-2 border-gray-300 order-2 lg:order-1 p-2 pt-4 lg:pt-2">
        <PurchaseForm
          productId={id}
          productSize={size}
          totalPrice={totalPrice}
          promoCode={promoCode}
          addresses={addresses}
        />
      </div>
      <div className="lg:w-1/2 lg:bg-gray-200 lg:border-l-2 border-gray-300 lg:border-t-2 lg:p-4 order-1 lg:order-2 lg:sticky lg:top-[57.6px] lg:h-[calc(100vh-57.6px)] lg:overflow-y-auto">
        <div className="flex w-full justify-between content-between border-2 border-gray-400 p-4 py-2 rounded-md bg-gray-300 mt-2 lg:mt-0">
          <div className="flex">
            <img
              src={getCloudinaryImageUrl(product?.images[0] as Image, cldName)}
              alt={`Product ${product?.id}`}
              className="h-20 object-cover rounded-md border-2 border-gray-400 px-2 bg-white"
            />
            <div className="flex-1 flex flex-col justify-center p-2">
              <p className="font-semibold">{product?.name}</p>
              <p className="text-gray-500">{size}</p>
            </div>
          </div>
          <p className="self-center pr-2 font-bold">
            ₹{(product?.price as number) + priceAdjustment}
          </p>
        </div>
        <PromoCodeDesktop totalPrice={totalPrice} promoCode={promoCode} />
      </div>
    </div>
  );
}
