"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { onSubmit } from "./AddProduct";
import { useRouter } from "next/navigation";
import { getCategory } from "@/components/admin/category/getCategory";

export const formSchema = z.object({
  productName: z
    .string()
    .min(2, { message: "Product name should be at least 2 characters" })
    .max(50, { message: "Product name should be at most 50 characters" }),
  price: z.string().min(1, { message: "Price must be greater than 0" }),
  category: z.string().min(1, { message: "Category is required" }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

interface Response {
  message: string | null;
  status: number;
}

function AddProductForm() {
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<Response | null>(null);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const categories = await getCategory();
      setCategories(categories);
    }
    fetchCategories();
  }, []);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      category: "",
      price: "0",
    },
  });

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  }

  function moveImageUp(index: number) {
    if (index === 0) return;
    const newImages = [...images];
    [newImages[index - 1], newImages[index]] = [
      newImages[index],
      newImages[index - 1],
    ];
    setImages(newImages);
  }

  function moveImageDown(index: number) {
    if (index === images.length - 1) return;
    const newImages = [...images];
    [newImages[index + 1], newImages[index]] = [
      newImages[index + 1],
      newImages[index],
    ];
    setImages(newImages);
  }

  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
  }

  async function handleSubmit(values: FormSchemaType) {
    setLoading(true);
    const response = await onSubmit(values, images);
    setLoading(false);
    if (response.status === 200) {
      router.refresh();
      setImages([]);
      setResponse(null);
    } else {
      setResponse(response);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Product Name:</FormLabel>
              <FormControl>
                <Input placeholder="y2k smth.." {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Price(₹):</FormLabel>
              <FormControl>
                <Input type="number" {...field} disabled={loading} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Category:</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel className="text-base">Images:</FormLabel>
          <FormControl>
            <Input
              id="picture"
              type="file"
              multiple
              onChange={handleImageChange}
              disabled={loading}
            />
          </FormControl>
          <FormDescription>Upload multiple images</FormDescription>
          <div className="space-y-2">
            {images.map((image, index) => (
              <div key={index} className="flex items-center space-x-2">
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-16 h-16 object-cover"
                />
                <Button
                  type="button"
                  onClick={() => moveImageUp(index)}
                  disabled={loading}
                >
                  Up
                </Button>
                <Button
                  type="button"
                  onClick={() => moveImageDown(index)}
                  disabled={loading}
                >
                  Down
                </Button>
                <Button
                  type="button"
                  onClick={() => removeImage(index)}
                  disabled={loading}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        </FormItem>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>

        {response?.message && (
          <p
            className={`${
              response.status === 200 ? "text-green-500 " : "text-red-500"
            } mt-2 text-center`}
          >
            {response.message}
          </p>
        )}
      </form>
    </Form>
  );
}

export default AddProductForm;
