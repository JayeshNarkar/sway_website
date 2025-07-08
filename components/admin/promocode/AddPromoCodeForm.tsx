"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { addPromoCode } from "@/components/admin/promocode/add-promo-code";

export default function AddPromoCodeForm() {
  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(true);

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <form
      className="w-full h-full p-4 bg-white shadow-md rounded-lg"
      action={async () => {
        setLoading(true);
        const success = await addPromoCode(code, discount, isActive);
        setLoading(false);
        if (success == true) {
          setCode("");
          setDiscount(0);
        } else {
          alert(success.message);
        }
      }}
    >
      <Label htmlFor="code">Code</Label>
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
      <Label htmlFor="discount">Discount (%)</Label>
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
          <p className="text-muted-foreground text-sm">
            If checked, coupon will be active and will work.
          </p>
        </div>
      </div>
      <Button type="submit" disabled={loading}>
        Submit
      </Button>
    </form>
  );
}
