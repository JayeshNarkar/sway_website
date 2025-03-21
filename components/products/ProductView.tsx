import { Product } from "@/lib/prisma";
import ImageCarousel from "@/components/products/ImageCarousel";

function ProductView({
  product,
  cldName,
}: {
  product: Product;
  cldName: string;
}) {
  return (
    <div className="mx-auto p-6">
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="w-full md:w-1/3">
          <ImageCarousel images={product.images || []} cldName={cldName} />
        </div>
        <div className="w-full md:w-2/3 lg:pl-10">
          <p className="text-lg text-gray-600 mb-2 font-semibold">
            {product.category}
          </p>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>
          <div className="flex items-center space-x-4 mb-4">
            <p className="text-2xl text-gray-800 font-bold">₹{product.price}</p>
            {product.originalPrice !== -1 && (
              <p className="text-lg text-gray-500 line-through">
                ₹{product.originalPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
