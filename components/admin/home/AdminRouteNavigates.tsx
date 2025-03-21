"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function AdminRouteNaviagates() {
  const router = useRouter();

  return (
    <>
      <Button variant={"link"} onClick={() => router.push("/admin/orders")}>
        Orders
      </Button>
      <Button variant={"link"} onClick={() => router.push("/admin/products")}>
        Manage Products
      </Button>
      <Button
        variant={"link"}
        onClick={() => router.push("/admin/site-settings")}
      >
        Site Settings
      </Button>
      <Button
        variant={"link"}
        onClick={() => router.push("/admin/support-requests")}
      >
        View Support Submissions
      </Button>
    </>
  );
}

export default AdminRouteNaviagates;
