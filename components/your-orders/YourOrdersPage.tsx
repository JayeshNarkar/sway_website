import getCldName from "@/lib/getCldName";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import { Image } from "@/lib/prisma";
import { Prisma } from "@prisma/client/edge";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

type OrderWithProductAndSizeAndPaymentInformation = Prisma.OrderGetPayload<{
  include: {
    product: {
      include: { images: true };
    };
    size: true;
    paymentInformation: true;
  };
}>;

type GroupedOrders = {
  active: OrderWithProductAndSizeAndPaymentInformation[];
  completed: OrderWithProductAndSizeAndPaymentInformation[];
  cancelled: OrderWithProductAndSizeAndPaymentInformation[];
};

const statusGroups = {
  active: ["temp", "pending", "confirmed"],
  completed: ["delivered"],
  cancelled: ["cancelled", "failed"],
};

const statusColors = {
  temp: "bg-yellow-100 text-yellow-800",
  pending: "bg-blue-100 text-blue-800",
  confirmed: "bg-green-100 text-green-800",
  delivered: "bg-purple-100 text-purple-800",
  cancelled: "bg-red-100 text-red-800",
  failed: "bg-gray-100 text-gray-800",
};

export default function ({
  orders,
}: {
  orders: OrderWithProductAndSizeAndPaymentInformation[];
}) {
  const groupedOrders = orders.reduce<GroupedOrders>(
    (acc, order) => {
      if (statusGroups.active.includes(order.status)) {
        acc.active.push(order);
      } else if (statusGroups.completed.includes(order.status)) {
        acc.completed.push(order);
      } else {
        acc.cancelled.push(order);
      }
      return acc;
    },
    { active: [], completed: [], cancelled: [] }
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-[80px] w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>

      {groupedOrders.active.length > 0 && (
        <section className="mb-12 w-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-500 rounded-full"></span>
            Active Orders
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
            {groupedOrders.active.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}

      {groupedOrders.completed.length > 0 && (
        <section className="mb-12 w-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-green-500 rounded-full"></span>
            Order History
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
            {groupedOrders.completed.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}

      {groupedOrders.cancelled.length > 0 && (
        <section className="w-full">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-gray-500 rounded-full"></span>
            Cancelled Orders
          </h2>
          <div className="grid gap-4 w-full">
            {groupedOrders.cancelled.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      )}

      {orders.length === 0 && (
        <div className="text-center py-12 w-full">
          <p className="text-gray-500 text-lg">
            You haven't placed any orders yet
          </p>
        </div>
      )}
    </div>
  );
}

function OrderCard({
  order,
}: {
  order: OrderWithProductAndSizeAndPaymentInformation;
}) {
  const cldName = getCldName();
  const productImage =
    getCloudinaryImageUrl(order.product.images[0] as Image, cldName) ||
    "/placeholder-product.jpg";

  const date = new Date(order.orderedAt);
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow w-full">
      <div className="p-4 h-full">
        <div className="flex justify-between items-start mb-3">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              statusColors[order.status]
            }`}
          >
            {order.status.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}{" "}
            {date.toLocaleTimeString()}
          </span>
        </div>

        <div className="flex gap-4">
          <div className="w-20 h-20 flex-shrink-0">
            <img
              src={productImage}
              alt={order.product.name}
              className="h-24 w-24 object-contain rounded-md border border-gray-300 p-2 bg-white"
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{order.product.name}</h3>
            <p className="text-sm text-gray-600">Size: {order.size.name}</p>
            <p className="text-sm text-gray-600">₹{order.totalPrice}</p>

            {(order.status === "pending" || order.status === "confirmed") && (
              <div className="mt-2 text-xs text-gray-500">
                <p>Payment method: {order.paymentMethod.toUpperCase()}</p>
                {order.paymentInformation && (
                  <p>UPI ID: {order.paymentInformation.upiId}</p>
                )}
              </div>
            )}
          </div>
        </div>
        {order.status === "temp" && (
          <form
            className="mt-8"
            action={async () => {
              "use server";
              redirect(`/checkout?id=${order.id}`);
            }}
          >
            <Button type="submit">Complete Order</Button>
          </form>
        )}

        {order.status === "pending" && order.paymentMethod == "upi" && (
          <form
            action={async () => {
              "use server";
              redirect(`/checkout?id=${order.id}`);
            }}
          >
            <Button type="submit" className="mt-2" variant={"outline"}>
              Complete Payment
            </Button>
            <div className="flex items-start mt-2 text-sm text-gray-500 md:mb-0">
              <Info className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" />
              <span>
                You'll be redirected to the checkout page to view our UPI
                payment details and complete your payment if you haven't
                already.
              </span>
            </div>
          </form>
        )}
        {(order.status === "confirmed" || order.status === "delivered") && (
          <form
            action={async () => {
              "use server";
              redirect(`/products/${order.product.id}`);
            }}
          >
            <Button type="submit" className="mt-2" variant={"outline"}>
              Order Again
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
