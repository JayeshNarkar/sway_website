import ImageCarousel from "@/components/products/ImageCarousel";
import { Product } from "@/lib/prisma";
import ProductViewClient from "@/components/products/ProductViewClient";

interface ProductViewProps {
  product: Product;
  cldName: string;
}

export default function ProductView({ product, cldName }: ProductViewProps) {
  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/3">
          <ImageCarousel images={product.images || []} cldName={cldName} />
        </div>
        <ProductViewClient product={product} />
      </div>
    </div>
  );
}
