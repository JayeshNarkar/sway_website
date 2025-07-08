"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDescription } from "@/components/ui/alert";
import { Alert } from "@/components/ui/alert";
import { AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { checkPromoCode } from "@/components/purchase/check-promo-code";
import { useRouter } from "next/navigation";

export default function PromoCodeDesktop({
  totalPrice,
  promoCode,
}: {
  totalPrice: number;
  promoCode: string | undefined;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(promoCode || "");

  const [codeApplied, setCodeApplied] = useState<
    undefined | { code: string; discount: number }
  >();

  const [promoCodeResponse, setPromoCodeResponse] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  return (
    <div className="hidden lg:block">
      <p className="font-bold text-xl mb-2">Promo Code</p>
      <div className="flex mb-4 space-x-2 bg-gray-200 border-2 border-gray-500 p-2 rounded-md">
        <Input
          className="w-1/2 border-gray-500"
          placeholder="SWAY18"
          disabled={loading || codeApplied != undefined}
          value={code}
          onChange={(e) => {
            const upperValue = e.target.value.toUpperCase();
            setCode(upperValue);
          }}
        />
        <Button
          className="w-1/2"
          onClick={async (e) => {
            e.preventDefault();
            if (!code) {
              setPromoCodeResponse({
                status: "error",
                message: "Please enter a promo code",
              });
              return;
            }

            setLoading(true);
            setPromoCodeResponse(null);

            const response = await checkPromoCode(code);

            setLoading(false);

            if (response.error) {
              setPromoCodeResponse({
                status: "error",
                message: response.error,
              });
              setCodeApplied(undefined);
            } else if (response.success) {
              setPromoCodeResponse({
                status: "success",
                message: `Promo code applied! ${response.discount}% discount`,
              });
              setCodeApplied({
                code: code,
                discount: response.discount,
              });
              const params = new URLSearchParams(window.location.search);
              params.set("promoCode", code);
              router.replace(`?${params.toString()}`, { scroll: false });
            }
          }}
          disabled={loading || codeApplied != undefined}
        >
          {loading ? "Applying..." : "Apply Code"}
        </Button>
      </div>
      {promoCodeResponse && (
        <Alert
          variant={
            promoCodeResponse.status === "success" ? "default" : "destructive"
          }
          className="mb-4"
        >
          {promoCodeResponse.status === "success" ? (
            <>
              <CheckCircle2Icon className="h-4 w-4" />
              <AlertTitle>Success!</AlertTitle>
            </>
          ) : (
            <>
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
            </>
          )}
          <AlertDescription>{promoCodeResponse.message}</AlertDescription>
        </Alert>
      )}
      <p className="font-bold text-xl mb-2">Order summary</p>
      <div className="w-full p-2 pt-0 space-y-2 text-sm mb-2">
        <div className="flex content-between justify-between">
          <p>Subtotal</p>
          {codeApplied == undefined ? (
            <p>₹{totalPrice}</p>
          ) : (
            <div className="flex">
              <p className="line-through mr-2">₹{totalPrice}</p>
              <p className="font-semibold">
                ₹
                {Math.floor(
                  totalPrice - totalPrice * (codeApplied.discount / 100)
                )}
              </p>
            </div>
          )}
        </div>
        <div className="flex content-between justify-between">
          <p>Shipping</p>
          <p className="text-gray-500">Free Shipping!</p>
        </div>
        <div className="flex content-between justify-between text-xl font-bold">
          <p>Total</p>
          {codeApplied == undefined ? (
            <p>₹{totalPrice}</p>
          ) : (
            <p className="font-semibold">
              ₹
              {Math.floor(
                totalPrice - totalPrice * (codeApplied.discount / 100)
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
