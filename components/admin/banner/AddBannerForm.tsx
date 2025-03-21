"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { AddBanner } from "@/components/admin/banner/AddBanner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  url: z.string().min(2).max(50),
});

function AddBannerForm() {
  const [image, setImage] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      if (!image) throw new Error("Image not provided");
      const res = await AddBanner(values.url, image);
      if (res.status == 200) router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 p-4">
        <Label htmlFor="image">Insert Image:</Label>
        <Input
          type="file"
          id="image"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImage(file);
            }
          }}
          required
          disabled={loading}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter url:</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://smth.com/smth"
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is the url that the customer will get redirected to when
                they click the banner.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default AddBannerForm;
