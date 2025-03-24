"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Product, Size } from "@/lib/prisma";
import { updateProductStock } from "@/components/admin/productStock/editProductStock";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import { getCategorySizes } from "@/components/admin/category/getCategorySizes";

interface EditProductStockFormProps {
  product: Product;
  cldName: string;
}

function EditProductStockForm({ product, cldName }: EditProductStockFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [stock, setStock] = useState<{ sizeId: number; inStock: boolean }[]>(
    []
  );
  const [sizes, setSizes] = useState<Size[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchSizes() {
      try {
        const sizes = await getCategorySizes(product.categoryName);
        setSizes(sizes);

        const initialStock = sizes.map((size) => {
          const existingStock = product.stock?.find(
            (item) => item.sizeId === size.id
          );
          return {
            sizeId: size.id,
            inStock: existingStock ? existingStock.inStock : false,
          };
        });

        setStock(initialStock);
      } catch (error) {
        console.error("Failed to fetch sizes:", error);
        setErrorMessage("Failed to fetch sizes");
      }
    }

    fetchSizes();
  }, [product.categoryName, product.stock]);

  function handleCheckboxChange(sizeId: number, checked: boolean) {
    setStock((prev) =>
      prev.map((item) =>
        item.sizeId === sizeId ? { ...item, inStock: checked } : item
      )
    );
  }

  async function handleSubmit() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await updateProductStock(product.id, stock);

      if (response.status === 200) {
        router.refresh();
        setErrorMessage("");
      } else {
        setErrorMessage(response.message || "Failed to update product stock");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while updating product stock");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-w-[300px] p-4 border rounded-lg shadow-md bg-white">
      <h2 className="mb-4 text-lg font-semibold">Edit Product Stock</h2>

      <p className="mb-2">
        <span className="font-medium">Product:</span> {product.name}
      </p>

      {product.images && product.images.length > 0 && (
        <div className="mb-4">
          <img
            src={getCloudinaryImageUrl(product.images[0], cldName)}
            alt={product.name}
            className="w-32 h-32 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="mb-4">
        <p className="font-medium mb-2">Stock Availability:</p>
        {sizes.map((size) => {
          const stockItem = stock.find((item) => item.sizeId === size.id);
          const adjustedPrice = product.price + size.priceAdjustment;
          return (
            <div key={size.id} className="flex items-center space-x-2 mb-2">
              <Checkbox
                id={`size-${size.id}`}
                checked={stockItem ? stockItem.inStock : false}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(size.id, checked as boolean)
                }
                disabled={loading}
              />
              <label htmlFor={`size-${size.id}`} className="text-sm">
                Size {size.name} - ₹{adjustedPrice} -{" "}
                {stockItem?.inStock ? "In Stock" : "Out of Stock"}
              </label>
            </div>
          );
        })}
      </div>

      <Button onClick={handleSubmit} disabled={loading}>
        {loading ? "Updating..." : "Update Stock"}
      </Button>

      {errorMessage && (
        <p className="mt-2 text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default EditProductStockForm;
