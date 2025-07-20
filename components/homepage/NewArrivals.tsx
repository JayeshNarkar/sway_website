import { Product } from "@/lib/prisma";
import ProductItem from "./ProductItem";
import TextAnimated from "./TextAnimatedAppear";

function NewArrivals({ products }: { products: Product[] }) {
  return (
    <div className="w-full bg-gray-50 pb-6 border-t-2 border-gray-500">
      <TextAnimated text={"New Arrivals"} />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-8">
        {products.map((product, index) => (
          <ProductItem product={product} index={index} key={index} />
        ))}
      </div>
    </div>
  );
}

export default NewArrivals;
