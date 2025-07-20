import BannerSlideShow from "@/components/homepage/BannerSlideShow";
import CatalogueLinkClient from "@/components/homepage/CatalogueLinkClient";
import Footer from "@/components/homepage/Footer";
import { getBanners } from "@/components/homepage/getBanners";
import getNewProducts from "@/components/homepage/getNewProducts";
import NewArrivals from "@/components/homepage/NewArrivals";
import getCldName from "@/lib/getCldName";
import { Product } from "@/lib/prisma";

async function Main() {
  const banners = await getBanners();
  const cldName = getCldName();
  const newProducts = await getNewProducts();
  return (
    <>
      <BannerSlideShow banners={banners} cldName={cldName} />
      <NewArrivals products={newProducts as Product[]} />
      <CatalogueLinkClient />
      <Footer />
    </>
  );
}

export default Main;
