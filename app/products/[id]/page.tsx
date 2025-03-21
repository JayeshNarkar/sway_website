import { getProduct } from "@/components/products/getProduct";
import ProductView from "@/components/products/ProductView";
import { addView } from "@/components/products/addView";
import getCldName from "@/lib/getCldName";
import { Product } from "@/lib/prisma";

async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await getProduct(Number(id));
  const cldName = getCldName();
  if (product) {
    addView(Number(id));
    return (
      <div className="mt-[64px] min-w-full min-h-screen">
        <ProductView product={product as Product} cldName={cldName} />
      </div>
    );
  } else {
    return (
      <div className="mt-[64px] min-w-full min-h-screen items-center text-center flex justify-center content-center">
        Product Not found
      </div>
    );
  }
}

export default ProductPage;
