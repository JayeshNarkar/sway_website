import { Product } from "@/lib/prisma";
import ProductItem from "@/components/homepage/ProductItem";
import TextAnimated from "@/components/homepage/TextAnimatedAppear";
import CatalogueLinkClient from "@/components/homepage/CatalogueLinkClient";

function NewArrivals({ products }: { products: Product[] }) {
  return (
    <div className="w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-300 via-pink-400 to-purple-500 border-t-2 border-gray-500">
      <TextAnimated text={"New Arrivals"} />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-4">
        {products.map((product, index) => (
          <ProductItem product={product} index={index} key={index} />
        ))}
      </div>
      <CatalogueLinkClient />
    </div>
  );
}

export default NewArrivals;
