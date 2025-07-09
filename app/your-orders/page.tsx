import YourOrdersPage from "@/components/your-orders/YourOrdersPage";
import authOptions from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function YourOrders() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: (
        await prisma.user.findUnique({
          where: {
            email: session.user.email as string,
          },
        })
      )?.id,
    },
    include: {
      product: {
        include: { images: true },
      },
      size: true,
      paymentInformation: true,
    },
  });

  if (orders.length > 0) {
    return <YourOrdersPage orders={orders} />;
  } else {
    return (
      <div className="flex flex-col mt-[64px] mx-4 gap-4 text-center">
        <p className="text-xl">Hello, {session.user.name}</p>
        <p className="text-xl">You havent made any orders yet.</p>
        <p>
          Checkout our{" "}
          <Link href={"/"} className="underline font-semibold">
            new arrivals
          </Link>
        </p>
      </div>
    );
  }
}

export default YourOrders;
