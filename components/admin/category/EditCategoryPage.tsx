import { getCategorySizes } from "@/components/admin/category/getCategory";
import EditCategoryForm from "@/components/admin/category/EditCategoryForm";

async function EditCategoryPage() {
  const categories = await getCategorySizes();

  return (
    <div className="overflow-x-auto whitespace-nowrap  max-w-full">
      <div className="flex space-x-4 overflow-scroll">
        {categories ? (
          categories.map((category) => (
            <EditCategoryForm key={category.id} category={category} />
          ))
        ) : (
          <div className="items-center text-center h-30">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default EditCategoryPage;
