"use server";
import getCategoryInfos from "@/components/admin/category/getCategoryInfos";
import { getCategory } from "@/components/admin/category/getCategory";
import EditCategoryInfoFormClient from "@/components/admin/category/EditCategoryInfoFormClient";

export default async function EditCategoryInfoForm() {
  const [categoryInfos, categories] = await Promise.all([
    getCategoryInfos(),
    getCategory(),
  ]);

  return (
    <div className="w-full p-4">
      <h3 className="text-lg font-semibold mb-3">Edit Category Description</h3>
      <EditCategoryInfoFormClient
        categories={categories}
        categoryInfos={categoryInfos}
      />
    </div>
  );
}
