"use server";
import authOptions from "@/lib/authOptions";
import { Image, prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import getCldName from "@/lib/getCldName";
import PurchaseForm from "@/components/purchase/PurchaseForm";

export default async function PurchaseView({
  id,
  size,
  priceAdjustment,
}: {
  id: number;
  size: string;
  priceAdjustment: number;
}) {
  const session = await getServerSession(authOptions);
  const cldName = getCldName();

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email as string,
    },
    include: {
      addresses: true,
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

  return (
    <div className="pt-[64px] flex-1 w-full min-h-screen p-4 lg:px-0 flex flex-col lg:flex-row">
      <div className="lg:w-1/2 lg:border-t-2 border-gray-300 order-2 lg:order-1 p-2 pt-4 lg:pt-2">
        <PurchaseForm
          productId={id}
          productSize={size}
          totalPrice={(product?.price as number) + priceAdjustment}
        />
      </div>
      <div className="lg:w-1/2 lg:bg-gray-200 lg:border-l-2 border-gray-300 lg:border-t-2 lg:p-4 order-1 lg:order-2 lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] lg:overflow-y-auto">
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
        <p className="font-bold text-xl mb-2 lg:block hidden pt-2">
          Order summary
        </p>
        <div className="w-full px-2 space-y-2 hidden lg:block text-sm">
          <div className="flex content-between justify-between">
            <p>Subtotal</p>
            <p>₹{(product?.price as number) + priceAdjustment}</p>
          </div>
          <div className="flex content-between justify-between">
            <p>Shipping</p>
            <p className="text-gray-500">Free Shipping!</p>
          </div>
          <div className="flex content-between justify-between text-xl font-bold">
            <p>Total</p>
            <p>₹{(product?.price as number) + priceAdjustment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
