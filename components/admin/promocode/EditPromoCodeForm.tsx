"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { removePromoCode } from "@/components/admin/promocode/remove-promo-code";
import { PromoCode } from "@/lib/prisma";
import { editPromoCode } from "@/components/admin/promocode/edit-promo-code";

export default function EditPromoCodeForm({
  promoCode,
}: {
  promoCode: PromoCode;
}) {
  const [code, setCode] = useState(promoCode.code);
  const [discount, setDiscount] = useState(promoCode.discount);
  const [isActive, setIsActive] = useState(promoCode.isActive);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <form
      className="min-w-[250px] p-4 border rounded-lg shadow-md bg-white flex flex-col"
      action={async () => {
        setLoading(true);
        const success = await editPromoCode(
          promoCode.id,
          code,
          discount,
          isActive
        );
        setLoading(false);
        if (success != true) {
          alert(success.message);
        }
      }}
    >
      <Label htmlFor="code" className="mb-1">
        Code
      </Label>
      <Input
        placeholder="SWAY18"
        id="code"
        className="mb-2"
        onChange={(e) => {
          setCode(e.target.value.toUpperCase());
        }}
        value={code}
        disabled={loading}
        required
      />
      <Label htmlFor="discount" className="mb-1">
        Discount (%)
      </Label>
      <Input
        placeholder="20"
        id="discount"
        className="mb-3"
        type="number"
        value={discount}
        onChange={(e) => {
          setDiscount(Number(e.target.value) > 0 ? Number(e.target.value) : 0);
        }}
        disabled={loading}
      />
      <div className="flex items-start gap-3 mb-2">
        <Checkbox
          id="isActive"
          checked={isActive}
          className="mt-2"
          onCheckedChange={(e: boolean) => setIsActive(e)}
          disabled={loading}
        />
        <div className="grid gap-1">
          <Label htmlFor="isActive">Is Active</Label>
          <p className="text-muted-foreground text-sm text-wrap">
            If checked, coupon will be active and will work.
          </p>
        </div>
      </div>
      <Button type="submit" disabled={loading} className="mb-2">
        Change discount
      </Button>
      <Button
        variant="destructive"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const success = await removePromoCode(promoCode.id);
          setLoading(false);
          if (!success) {
            alert("Failed to remove promocode");
          }
        }}
      >
        Remove Promo Code
      </Button>
    </form>
  );
}
