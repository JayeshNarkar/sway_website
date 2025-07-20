import ProductItem from "@/components/homepage/ProductItem";
import TextAnimated from "@/components/homepage/TextAnimatedAppear";
import { prisma, Product } from "@/lib/prisma";

export default async function Catalogue() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  return (
    <div className="w-full bg-gray-50 mt-[78.8px] border-t-2 border-gray-300">
      <TextAnimated text={"Catalogue"} />
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pb-8">
        {products &&
          products.map((product, index) => (
            <ProductItem
              product={product as Product}
              index={index}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}
