"use client";
import { Button } from "@/components/ui/button";
import getCldName from "@/lib/getCldName";
import { Prisma } from "@prisma/client/edge";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import { Image, OrderStatus } from "@/lib/prisma";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { markOrderConfirmed } from "@/components/admin/orders/mark-order-confirmed";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";

type OrderWithProductAndSizeAndPaymentInformation = Prisma.OrderGetPayload<{
  where: {
    OR: [
      { status: "confirmed" },
      { status: "delivered" },
      { status: "pending" }
    ];
  };
  include: {
    product: {
      include: {
        images: true;
      };
    };
    address: true;
    user: true;
    paymentInformation: true;
    promoCode: true;
    size: true;
    contact: true;
  };
}>;

export default function OrderCard({
  order,
}: {
  order: OrderWithProductAndSizeAndPaymentInformation;
}) {
  const cldName = getCldName();
  const statusColors: Record<OrderStatus, string> = {
    temp: "bg-yellow-100 text-yellow-800",
    pending: "bg-blue-100 text-blue-800",
    confirmed: "bg-green-100 text-green-800",
    delivered: "bg-purple-100 text-purple-800",
    cancelled: "bg-red-100 text-red-800",
    failed: "bg-gray-100 text-gray-800",
  };

  const date = new Date(order.orderedAt);

  const [txnID, setTxnID] = useState<string>("");
  const [response, SetResponse] = useState<
    { message: string } | true | undefined
  >();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-3">
        <span
          className={`text-xs font-medium px-2 py-1 rounded-full ${
            statusColors[order.status] || "bg-gray-100 text-gray-800"
          }`}
        >
          {order.status.toUpperCase()}
        </span>
        <div className="text-sm text-gray-500 whitespace-nowrap ml-2">
          {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
          {date.toLocaleTimeString()}
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <img
          src={
            getCloudinaryImageUrl(order.product.images[0] as Image, cldName) ||
            "/placeholder-product.jpg"
          }
          alt={order.product.name}
          className="h-32 w-h-32 object-contain rounded-md border border-gray-300 p-2 bg-white"
        />

        <div className="flex-1">
          <strong className="text-base text-gray-800">Product Name: </strong>
          <p className="text-sm text-gray-600">{order.product.name}</p>
          <strong className="text-base text-gray-800">Size: </strong>
          <p className="text-sm text-gray-600">{order.size.name}</p>
          <strong className="text-base text-gray-800">Price: </strong>
          <p className="text-sm text-gray-600">₹{order.totalPrice}</p>
        </div>
      </div>

      <div className="flex-1 m-2">
        <strong className="text-base text-gray-800">Order ID: </strong>
        <p className="text-sm text-gray-600  whitespace-nowrap">{order.id}</p>

        <strong className="text-base text-gray-800">Customer Details:</strong>
        <p className="text-sm text-gray-600">{order.user?.email}</p>
        <p className="text-sm text-gray-600">{order.contact?.number}</p>
        <strong className="text-base text-gray-800">Customers UPI ID: </strong>
        {order.paymentInformation?.upiId && (
          <p className="text-sm text-gray-600  whitespace-nowrap">
            {order.paymentInformation.upiId}
          </p>
        )}
        <strong className="text-base text-gray-800">
          Order&apos;s Transaction ID:
        </strong>
        {order.paymentInformation?.txnId && (
          <p className="text-sm text-gray-600  whitespace-nowrap">
            {order.paymentInformation.txnId}
          </p>
        )}
        {order.promoCode && (
          <>
            <strong className="text-base text-gray-800">Promo Code: </strong>
            <p className="text-sm text-gray-600">
              {order.promoCode.code} (-{order.promoCode.discount}%)
            </p>
          </>
        )}
      </div>
      {order.status === "pending" && (
        <form>
          <strong className="text-base text-gray-800 mb-2">
            Enter Transaction ID:
          </strong>
          <Input
            id="txnId"
            className="mb-2"
            placeholder="FMPIB2711679949"
            required
            value={txnID}
            onChange={(e) => {
              setTxnID(e.target.value);
            }}
            disabled={loading}
          />
          <Button
            disabled={loading}
            className="w-fit"
            type="submit"
            onClick={async () => {
              setLoading(true);
              SetResponse(
                await markOrderConfirmed(
                  txnID,
                  order.paymentInformationId,
                  order.id
                )
              );
              setLoading(false);
            }}
          >
            {loading ? "Processing..." : "Mark Confirmed"}
          </Button>
          {response && (
            <Alert
              variant={response == true ? "default" : "destructive"}
              className="mt-2"
            >
              {response == true ? (
                <>
                  <CheckCircle2Icon className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Marked confirmed successfully!
                  </AlertDescription>
                </>
              ) : (
                <>
                  <AlertCircleIcon className="h-4 w-4" />
                  <AlertTitle>Error occurred</AlertTitle>
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
        </form>
      )}

      {order.status === "confirmed" && order.address && (
        <div className="mt-2 p-3 bg-gray-50 rounded-md">
          <strong className="text-base text-gray-800">Shipping Address:</strong>
          <p className="text-sm text-gray-600">
            {order.address.flatAndBuilding}
          </p>
          <p className="text-sm text-gray-600">{order.address.street}</p>
          <p className="text-sm text-gray-600">
            {order.address.city}, {order.address.state} -{" "}
            {order.address.pincode}
          </p>
          <p className="text-sm text-gray-600">{order.address.country}</p>
        </div>
      )}
    </div>
  );
}
