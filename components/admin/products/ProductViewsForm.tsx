"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import resetProductViews from "@/components/admin/products/resetProductViews";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";

function ProductViewsForm({
  product,
  cldName,
}: {
  product: Product;
  cldName: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const views = product.views || [];

  const authorizedViews = views
    .filter((view) => view.userId !== null)
    .reduce((sum, view) => sum + view.count, 0);

  const unauthorizedViews = views
    .filter((view) => view.userId === null)
    .reduce((sum, view) => sum + view.count, 0);

  const totalViews = authorizedViews + unauthorizedViews;

  const handleResetViews = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const result = await resetProductViews(product.id);
      if (result.success) {
        router.refresh();
      } else {
        setErrorMessage(result.message || "Failed to reset views");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred while resetting views");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-w-[300px] p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">{product.name}</h2>

      {product.images && product.images.length > 0 && (
        <img
          src={getCloudinaryImageUrl(product.images[0], cldName)}
          alt={`Product ${product.id}`}
          className="w-32 h-32 object-cover mb-4"
        />
      )}

      <div className="space-y-2">
        <p>
          <strong>Authorized Users Views:</strong> {authorizedViews}
        </p>
        <p>
          <strong>Unauthorized Users Views:</strong> {unauthorizedViews}
        </p>
        <p>
          <strong>Total Views:</strong> {totalViews}
        </p>
      </div>

      <Button
        className="mt-4"
        onClick={handleResetViews}
        disabled={loading}
        variant="destructive"
      >
        {loading ? "Resetting..." : "Reset All Views"}
      </Button>

      {errorMessage && (
        <p className="text-center text-red-500 text-wrap mt-4">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default ProductViewsForm;
