import { Image } from "@/lib/prisma";
import getCldName from "@/lib/getCldName";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import { Prisma } from "@prisma/client/edge";
import CheckoutClientComponent from "@/components/checkout/CheckoutClientComponent";

type OrderWithProductAndSize = Prisma.OrderGetPayload<{
  include: {
    product: {
      include: {
        images: true;
      };
    };
    size: true;
    paymentInformation: true;
  };
}>;

export default function CheckoutPage({
  order,
}: {
  order: OrderWithProductAndSize;
}) {
  const cldName = getCldName();
  const upiId = "utsavbhandari220@oksbi";
  const url = `upi://pay?pa=${upiId}&pn=SwayOrder&am=${order.totalPrice}&cu=INR`;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center pt-[78.8px]">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-4 mb-6 border border-gray-200">
        <div className="flex flex-row md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <img
              src={getCloudinaryImageUrl(
                order.product?.images[0] as Image,
                cldName
              )}
              alt={`Product ${order.product?.id}`}
              className="h-24 w-24 object-contain rounded-md border border-gray-300 p-2 bg-white"
            />
            <div className="flex-1">
              <h3 className="font-medium text-lg">{order.product?.name}</h3>
              <p className="text-gray-600">{order.size.name}</p>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-2 rounded-md border border-gray-200 min-w-[180px]">
            <p className="text-center font-medium">
              Order Total:{" "}
              <span className="text-green-600">₹{order.totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <CheckoutClientComponent
            url={url}
            upiId={upiId}
            orderId={order.id}
            paymentInformation={order.paymentInformation}
          />
        </div>
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">
            Payment & Order Policies
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>
                Orders will be processed only after receiving a valid UPI
                payment reference. Your order status will be marked as
                &quot;Pending&quot; until payment verification is complete.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>
                Payment verification typically occurs within 24 hours of
                receipt. You will receive confirmation via SMS to the contact
                number provided during checkout.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>
                Any payments received without a corresponding order reference
                will be automatically refunded to the original payment method
                within 1-3 business days.
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-0.5">•</span>
              <span>
                For payment verification issues, please contact our support team
                with your UPI transaction reference number.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
