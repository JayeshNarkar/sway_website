"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import deleteOrder from "@/components/admin/orders/delete_order";
import { useState } from "react";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant={"destructive"}
      disabled={loading}
      className="p-2"
      onClick={async () => {
        if (confirm("Are you sure you want to delete this order?")) {
          setLoading(true);
          await deleteOrder(orderId);
          setLoading(false);
        }
      }}
    >
      <Trash2 className={loading ? "opacity-50" : ""} />
    </Button>
  );
}
