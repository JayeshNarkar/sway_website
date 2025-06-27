import { productFetch } from "@/components/admin/products/ProductFetch";
import getCldName from "@/lib/getCldName";
import EditProductForm from "@/components/admin/products/EditProductForm";
import { Product } from "@/lib/prisma";

async function EditProductPage() {
  const products = await productFetch();
  const cldName = getCldName();
  return (
    <div className="overflow-x-auto whitespace-nowrap max-w-full">
      <div className="flex space-x-4 overflow-scroll">
        {products ? (
          products.map((product) => (
            <EditProductForm
              key={product.id}
              product={product as Product}
              cldName={cldName}
            />
          ))
        ) : (
          <div className="items-center text-center h-30">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default EditProductPage;
