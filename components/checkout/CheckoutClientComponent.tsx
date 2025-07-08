"use client";

import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircleIcon, CheckCircle2Icon, Info } from "lucide-react";
import { confirmPaymentInformation } from "@/components/checkout/confirm-payment-information";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PaymentInformation } from "@prisma/client/edge";

export default function ({
  url,
  upiId,
  orderId,
  paymentInformation,
}: {
  url: string;
  upiId: string;
  orderId: string;
  paymentInformation: PaymentInformation | null;
}) {
  const upiQRRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [savingQr, setSavingQr] = useState<boolean>(false);
  const [customersUPiId, setCustomersUPiId] = useState<string>(
    paymentInformation ? paymentInformation.upiId! : ""
  );

  const [response, setResponse] = useState<
    { message: string; valid: boolean } | undefined
  >();

  const handleSaveQRCode = async () => {
    if (!upiQRRef.current) return;

    try {
      setSavingQr(true);
      const dataUrl = await toPng(upiQRRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = `payment-qr-${orderId}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error saving QR code:", error);
    } finally {
      setSavingQr(false);
    }
  };
  console.log(paymentInformation);
  return (
    <>
      <span ref={upiQRRef}>
        <h2 className="text-xl font-semibold mb-2">Scan to Pay via UPI</h2>
        <div className="p-4 bg-white rounded border border-gray-300 mb-2 shadow-sm">
          <QRCode value={url} size={200} className="mx-auto" />
        </div>
        <p className="text-gray-600 text-sm mb-6 text-center">
          or send payment to: <br />
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
            {upiId}
          </span>
        </p>
      </span>
      <div className="flex flex-col w-full">
        <Button
          variant="outline"
          className="min-w-[120px] mb-2"
          disabled={loading || savingQr}
          onClick={handleSaveQRCode}
        >
          {savingQr ? "Saving..." : "Save QR Code"}
        </Button>
        <Label htmlFor="upiId" className="font-semibold text-base">
          Your upi id
        </Label>
        <Input
          id="upiId"
          placeholder="smth@oksbi"
          value={customersUPiId}
          onChange={(e) => setCustomersUPiId(e.target.value)}
          disabled={loading || paymentInformation != null}
        />
        <div className="flex items-start mt-2 text-sm text-gray-500 mb-4">
          <Info className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" />
          <span>
            For payment verification. Please enter the UPI ID you'll use to
            complete this transaction.
          </span>
        </div>
        <Button
          className="min-w-[120px] "
          type="submit"
          onClick={async () => {
            setLoading(true);
            const result = await confirmPaymentInformation(
              customersUPiId,
              orderId
            );
            setResponse(result);

            if (result?.valid) {
              setTimeout(() => {
                window.location.href = "/";
              }, 3000);
            }

            setLoading(false);
          }}
          disabled={loading || savingQr || paymentInformation != null}
        >
          {loading ? "Processing..." : "Confirm Payment"}
        </Button>
        {response && (
          <Alert
            variant={response.valid ? "default" : "destructive"}
            className="mt-4"
          >
            {response.valid ? (
              <>
                <CheckCircle2Icon className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>{response.message}</AlertDescription>
              </>
            ) : (
              <>
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Unable to process your Information.</AlertTitle>
                <AlertDescription>
                  <p>
                    {response.message ||
                      "Please verify your information and try again."}
                  </p>
                </AlertDescription>
              </>
            )}
          </Alert>
        )}
      </div>
    </>
  );
}
