import getCloudinaryImageUrl from "@/lib/getCloudinaryImageUrl";
import { Product } from "@/lib/prisma";
import Link from "next/link";

function NewArrivals({
  products,
  cldName,
}: {
  products: Product[];
  cldName: string;
}) {
  return (
    <div className="w-full bg-gray-50 py-6 border-t-2 border-gray-500">
      <p className="font-semibold text-2xl text-center mb-8 text-gray-700">
        New Arrivals
      </p>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mb-4">
        {products.map((product) => (
          <Link
            key={product.id}
            className="flex flex-col items-center border border-gray-200 rounded-lg p-4 transition-all shadow-md hover:border-gray-300 bg-white product-scroll-item"
            href={"/products/" + product.id}
          >
            {product.images && product.images.length > 0 ? (
              <div className="w-full h-64 relative overflow-hidden rounded-lg">
                <img
                  src={getCloudinaryImageUrl(product.images[0], cldName)}
                  alt={product.name}
                  className="w-full h-full object-contain absolute inset-0 duration-300 hover:scale-110 transition-all"
                />
                {product.images[1] && (
                  <img
                    src={getCloudinaryImageUrl(product.images[1], cldName)}
                    alt={product.name}
                    className="w-full h-full object-contain absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  />
                )}
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                <span className="text-gray-500">No Image</span>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-lg text-gray-800">{product.name}</p>
              {product.originalPrice !== -1 ? (
                <div className="flex items-center justify-center space-x-2">
                  <p className="text-lg text-gray-600 font-semibold">
                    ₹{product.price}
                  </p>
                  <p className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice}
                  </p>
                </div>
              ) : (
                <p className="text-lg text-gray-600">₹{product.price}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
