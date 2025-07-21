"use client";

import { Button } from "@/components/ui/button";
import { removeProduct } from "@/components/admin/products/removeProduct";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  editProduct,
  addProductImage,
  removeProductImage,
  backgroundRemoval,
} from "@/components/admin/products/editProduct";
import { Product } from "@/lib/prisma";
import { Label } from "@/components/ui/label";
import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import { getCategory } from "@/components/admin/category/getCategory";

interface EditProductFormProps {
  product: Product;
  cldName: string;
}

function EditProductForm({ product, cldName }: EditProductFormProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    category: product.categoryName,
    originalPrice: product.originalPrice > 0 ? product.originalPrice : -1,
    setDiscount: product.originalPrice > 0,
  });
  const [showOriginalPrice, setShowOriginalPrice] = useState(
    product.originalPrice > 0
  );

  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getCategory();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setErrorMessage("Failed to fetch categories");
      }
    }
    fetchCategories();
  }, []);

  return (
    <div
      key={product.id}
      className="min-w-[300px] p-4 border rounded-lg shadow-md bg-white"
    >
      <h2 className="mb-2">
        Product Name:{" "}
        <Input
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          disabled={loading}
        />
      </h2>
      {showOriginalPrice && (
        <div className="mt-2">
          <p>Original Price(₹):</p>
          <Input
            type="number"
            value={formData.originalPrice || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                originalPrice: Number(e.target.value),
              }))
            }
            disabled={loading}
          />
        </div>
      )}
      <p className="mb-2">
        Price(₹):
        <Input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: Number(e.target.value) }))
          }
          disabled={loading}
        />
      </p>
      <div className="mb-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showOriginalPrice}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setShowOriginalPrice(isChecked);
              if (!isChecked) {
                setFormData((prev) => ({
                  ...prev,
                  originalPrice: -1,
                  setDiscount: false,
                }));
              } else {
                setFormData((prev) => ({
                  ...prev,
                  setDiscount: true,
                  originalPrice: prev.price + 1,
                }));
              }
            }}
            disabled={loading}
          />
          <span>Add Discount:</span>
        </label>
      </div>
      <p>Category:</p>
      <Select
        defaultValue={formData.category}
        onValueChange={(value) =>
          setFormData((prev) => ({ ...prev, category: value }))
        }
        disabled={loading}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="mb-2">
        <p className="mb-2">Images:</p>
        <ul>
          {product.images &&
            product.images.map((image) => (
              <li key={image.id} className="flex space-x-2 items-center">
                <img
                  src={getCloudinaryImageUrl(image, cldName)}
                  alt={`Product ${product.id}`}
                  className="w-12 h-12 object-cover mb-2"
                />
                <div>
                  <div className="flex items-center">
                    <Label htmlFor="bgRemoval text-xs">
                      Remove Background:
                    </Label>
                    <Checkbox
                      id="bgRemoval"
                      disabled={loading}
                      checked={image.bgRemoval}
                      onCheckedChange={async (checked) => {
                        setLoading(true);
                        setErrorMessage("");
                        try {
                          const result = await backgroundRemoval(
                            image.id,
                            checked as boolean
                          );
                          if (result.status === 200) {
                            router.refresh();
                          } else {
                            setErrorMessage(
                              result.message ||
                                "Failed to update background removal"
                            );
                          }
                        } catch (error) {
                          console.log(error);
                          setErrorMessage(
                            "An error occurred while updating background removal"
                          );
                        } finally {
                          setLoading(false);
                        }
                      }}
                    />
                  </div>
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setLoading(true);
                      removeProductImage(image.id).then((res) => {
                        if (res.status === 200) {
                          setErrorMessage("");
                          router.refresh();
                        } else {
                          setErrorMessage(res.message as string);
                        }
                        setLoading(false);
                      });
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              </li>
            ))}
        </ul>
        <p>Add Image:</p>
        <Input
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setLoading(true);
              addProductImage(file, product.id).then((res) => {
                if (res.status === 200) {
                  setErrorMessage("");
                  router.refresh();
                } else {
                  setErrorMessage(res.message as string);
                }
                setLoading(false);
              });
            }
          }}
        />
      </div>
      <Button
        className="mr-2"
        disabled={loading}
        onClick={() => {
          setLoading(true);
          editProduct(product.id, formData).then((res) => {
            if (res.status === 200) {
              setErrorMessage("");
              router.refresh();
            } else {
              setErrorMessage(res.message as string);
            }
            setLoading(false);
          });
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          setLoading(true);
          removeProduct(product.id).then((res) => {
            if (res.status === 200) {
              setErrorMessage("");
              router.refresh();
            } else {
              setErrorMessage(res.message as string);
            }
            setLoading(false);
          });
        }}
        disabled={loading}
      >
        Remove Product
      </Button>
      {errorMessage && (
        <p className="text-center text-red-500 text-wrap">{errorMessage}</p>
      )}
    </div>
  );
}

export default EditProductForm;
