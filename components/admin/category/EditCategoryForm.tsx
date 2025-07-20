"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Category, Size } from "@/lib/prisma";
import {
  editCategory,
  deleteCategory,
} from "@/components/admin/category/editCategory";

interface EditCategoryFormProps {
  category: Category;
}

function EditCategoryForm({ category }: EditCategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sizes, setSizes] = useState<Size[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (category.sizes) {
      setSizes(category.sizes);
    }
  }, [category.sizes]);

  function handleSizeChange(
    index: number,
    field: "name" | "priceAdjustment",
    value: string | number
  ) {
    setSizes((prev) =>
      prev.map((size, i) =>
        i === index
          ? {
              ...size,
              [field]: field === "priceAdjustment" ? Number(value) : value,
            }
          : size
      )
    );
  }

  function addSize() {
    setSizes((prev) => [
      ...prev,
      { id: -1, name: "", priceAdjustment: 0, categoryId: category.id },
    ]);
  }

  function removeSize(index: number) {
    setSizes((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleUpdateSizes() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await editCategory(category.id, sizes);

      if (response.status === 200) {
        router.refresh();
        setErrorMessage("");
      } else {
        setErrorMessage(response.message || "Failed to update category sizes");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while updating the category sizes");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCategory() {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await deleteCategory(category.id);

      if (response.status === 200) {
        router.refresh();
      } else {
        setErrorMessage(response.message || "Failed to delete category");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred while deleting the category");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-w-full p-4 border rounded-lg shadow-md bg-white overflow-auto">
      <h2 className="mb-4 text-lg font-semibold whitespace-nowrap">
        Edit Category: {category.name}
      </h2>

      <div className="mb-4">
        <p className="font-medium mb-2">Sizes:</p>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <Input
              value={size.name}
              onChange={(e) => handleSizeChange(index, "name", e.target.value)}
              disabled={loading}
              placeholder="Size name"
              className="w-24"
            />
            <Input
              type="number"
              value={size.priceAdjustment}
              onChange={(e) =>
                handleSizeChange(index, "priceAdjustment", e.target.value)
              }
              disabled={loading}
              placeholder="Price adjustment"
              className="w-24"
            />
            <Button
              type="button"
              onClick={() => removeSize(index)}
              disabled={loading}
              variant="destructive"
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        onClick={addSize}
        disabled={loading}
        variant="outline"
        className="mb-4"
      >
        Add Size
      </Button>

      <div className="flex flex-col space-y-2 p-2">
        <Button onClick={handleUpdateSizes} disabled={loading}>
          {loading ? "Updating..." : "Update Sizes"}
        </Button>

        <Button
          onClick={handleDeleteCategory}
          disabled={loading}
          variant="destructive"
        >
          {loading ? "Deleting..." : "Delete Category"}
        </Button>
      </div>

      {errorMessage && (
        <p className="mt-2 text-center text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}

export default EditCategoryForm;
