import { viewsProductFetch } from "@/components/admin/products/ProductFetch";
import getCldName from "@/lib/getCldName";
import ProductViewsForm from "@/components/admin/products/ProductViewsForm";

async function ProductViewsPage() {
  const products = await viewsProductFetch();
  const cldName = getCldName();
  return (
    <div className="overflow-x-auto whitespace-nowrap max-w-full">
      <div className="flex space-x-4 overflow-scroll">
        {products ? (
          products.map((product) => (
            <ProductViewsForm
              key={product.id}
              product={product}
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
export default ProductViewsPage;
