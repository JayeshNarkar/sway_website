"use server";
import ImageCarousel from "@/components/products/ImageCarousel";
import { Product } from "@/lib/prisma";
import ProductViewClient from "@/components/products/ProductViewClient";
import getCategoryInfos from "@/components/admin/category/getCategoryInfos";

interface ProductViewProps {
  product: Product;
  cldName: string;
}

export default async function ProductView({
  product,
  cldName,
}: ProductViewProps) {
  const categoryInfos = await getCategoryInfos();
  const categoryInfo = categoryInfos.find(
    (info) => info.categoryId === product.category?.id
  );

  return (
    <div className="mx-auto p-6 lg:p-0 lg:py-0 lg:px-2">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/3">
          <ImageCarousel images={product.images || []} cldName={cldName} />
        </div>
        <ProductViewClient product={product} categoryInfo={categoryInfo} />
      </div>
    </div>
  );
}
