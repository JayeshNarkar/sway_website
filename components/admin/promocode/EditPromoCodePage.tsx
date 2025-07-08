import EditPromoCodeForm from "@/components/admin/promocode/EditPromoCodeForm";
import { prisma } from "@/lib/prisma";

export default async function EditPromoCodePage() {
  const promoCodes = await prisma.promoCode.findMany();
  return (
    <div className="bg-gray-100 flex items-center rounded justify-center max-w-full">
      <div className="overflow-x-auto whitespace-nowrap p-4 flex space-x-4">
        {promoCodes &&
          promoCodes.map((promoCode) => (
            <EditPromoCodeForm promoCode={promoCode} key={promoCode.id} />
          ))}
      </div>
    </div>
  );
}
