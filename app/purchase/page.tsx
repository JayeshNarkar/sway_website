import PurchaseView from "@/components/purchase/PurchaseView";
import validateProduct from "@/components/purchase/validateProduct";
import authOptions from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Purchase({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/");
  }
  const { id, size } = await searchParams;
  const { isValid, priceAdjustment } = await validateProduct(
    Number(id),
    size as string
  );
  if (!isValid) {
    return (
      <div className="w-full min-h-screen text-center items-center flex content-center justify-center">
        <p>Product of that size isnt in stock Or the id is incorrect</p>
      </div>
    );
  }
  return (
    <PurchaseView
      id={Number(id)}
      size={size as string}
      priceAdjustment={priceAdjustment as number}
    />
  );
}
