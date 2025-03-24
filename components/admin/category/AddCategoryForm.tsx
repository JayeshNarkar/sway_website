"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCategory } from "@/components/admin/category/addCategory";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name should be at least 2 characters" })
    .max(50, { message: "Category name should be at most 50 characters" }),
  sizes: z
    .array(z.string().min(1, { message: "Size cannot be empty" }))
    .min(1, { message: "At least one size is required" }),
});

export type FormSchemaType = z.infer<typeof formSchema>;

function AddCategoryForm() {
  const [loading, setLoading] = useState(false);
  const [sizeFields, setSizeFields] = useState([""]);
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sizes: [""],
    },
  });

  function addSizeField() {
    setSizeFields((prev) => [...prev, ""]);
    form.setValue("sizes", [...form.getValues("sizes"), ""]);
  }

  async function handleSubmit(values: FormSchemaType) {
    setLoading(true);

    const sizesArray = values.sizes.filter((size) => size.trim() !== "");

    const response = await addCategory(values.name, sizesArray);
    setLoading(false);

    if (response.status === 200) {
      router.refresh();
      form.reset();
      setSizeFields([""]);
    } else {
      console.log(response);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Category Name:</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Upperwear"
                  {...field}
                  disabled={loading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {sizeFields.map((_, index) => (
          <FormField
            key={index}
            control={form.control}
            name={`sizes.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">
                  {index === 0 ? "Size 1:" : `Size ${index + 1}:`}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`e.g., Size ${index + 1} like M or L or XL `}
                    {...field}
                    disabled={loading}
                    onChange={(e) => {
                      field.onChange(e);
                      const updatedSizes = [...form.getValues("sizes")];
                      updatedSizes[index] = e.target.value;
                      form.setValue("sizes", updatedSizes);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="button"
          onClick={addSizeField}
          disabled={loading}
          variant="outline"
          className="mr-2"
        >
          Add More Sizes
        </Button>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}

export default AddCategoryForm;
