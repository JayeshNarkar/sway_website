import { productFetchWithStock } from "@/components/admin/products/ProductFetch";
import getCldName from "@/lib/getCldName";
import { Product } from "@/lib/prisma";
import EditProductStockForm from "@/components/admin/productStock/EditProductStockForm";

async function EditProductPage() {
  const products = await productFetchWithStock();
  const cldName = getCldName();
  return (
    <div className="overflow-x-auto whitespace-nowrap  max-w-full">
      <div className="flex space-x-4 overflow-scroll">
        {products ? (
          products.map((product) => (
            <EditProductStockForm
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
