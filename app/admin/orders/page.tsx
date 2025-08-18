import OrderCard from "@/components/admin/orders/OrderCard";
import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    where: {
      OR: [
        { status: "confirmed" },
        { status: "delivered" },
        { status: "pending" },
      ],
    },
    include: {
      product: {
        include: {
          images: true,
        },
      },
      deliveryInformation: true,
      address: true,
      user: true,
      paymentInformation: true,
      promoCode: true,
      size: true,
      contact: true,
    },
    orderBy: {
      orderedAt: "desc",
    },
  });

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const confirmedOrders = orders.filter(
    (order) => order.status === "confirmed"
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  const completedOrdersTotal = deliveredOrders.reduce(
    (total, order) => total + order.totalPrice,
    0
  );

  return (
    <div className="w-full min-h-screen p-4 mt-[78.8px] space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Pending Orders ({pendingOrders.length})
        </h2>
        {pendingOrders.length > 0 ? (
          <div className="flex gap-4 bg-gray-300 p-4 rounded-md overflow-x-scroll">
            {pendingOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No pending orders</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Confirmed Orders ({confirmedOrders.length})
        </h2>
        {confirmedOrders.length > 0 ? (
          <div className="flex gap-4 bg-gray-300 p-4 rounded-md overflow-x-scroll">
            {confirmedOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No confirmed orders</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Completed Orders: ₹{completedOrdersTotal} ({deliveredOrders.length})
        </h2>
        {deliveredOrders.length > 0 ? (
          <div className="flex gap-4 bg-gray-300 p-4 rounded-md overflow-x-scroll">
            {deliveredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No completed orders</p>
        )}
      </section>
    </div>
  );
}
