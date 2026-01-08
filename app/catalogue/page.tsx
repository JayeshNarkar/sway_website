import AnnouncementBar from "@/components/homepage/AnnouncementBar";
import Footer from "@/components/homepage/Footer";
import getAnnouncementMessages from "@/components/homepage/getAnnouncementMessages";
import ProductItem from "@/components/homepage/ProductItem";
import TextAnimated from "@/components/homepage/TextAnimatedAppear";
import { prisma, Product } from "@/lib/prisma";

export default async function Catalogue() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });
  const announcementMessages = await getAnnouncementMessages();

  return (
    <div className="w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-300 via-pink-400 to-purple-500">
      <AnnouncementBar messages={announcementMessages} />
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
      <Footer />
    </div>
  );
}
