import { getBanners } from "@/components/homepage/getBanners";
import getCldName from "@/lib/getCldName";
import EditBannerForm from "@/components/admin/banner/EditBannerForm";

async function EditBannersPage() {
  const banners = await getBanners();
  const cldName = getCldName();
  return (
    <div className="overflow-x-auto whitespace-nowrap p-4">
      <div className="flex space-x-4">
        {banners ? (
          banners.map((banner, index) => (
            <EditBannerForm key={index} banner={banner} cldName={cldName} />
          ))
        ) : (
          <div className="items-center text-center h-30">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default EditBannersPage;
