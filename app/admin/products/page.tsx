import AddBannerForm from "@/components/admin/banner/AddBannerForm";
import EditBannersPage from "@/components/admin/banner/EditBannersPage";
import EditProductPage from "@/components/admin/products/EditProductPage";
import AddProductForm from "@/components/admin/products/AddProductForm";
import ProductViewsPage from "@/components/admin/products/ProductViewsPage";
import AddCategoryForm from "@/components/admin/category/AddCategoryForm";
import EditCategoryPage from "@/components/admin/category/EditCategoryPage";
import EditProductStock from "@/components/admin/productStock/EditProductStock";
import AddPromoCodeForm from "@/components/admin/promocode/AddPromoCodeForm";
import EditPromoCodePage from "@/components/admin/promocode/EditPromoCodePage";

function Products() {
  return (
    <div className="w-full h-full p-4 mt-[64px]">
      <h1 className="text-xl font-bold mb-4">
        <span className="underline p-2">Admin Product Management</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Add Category</h2>
          <div className="bg-gray-100 p-4 flex items-center justify-center flex-col rounded">
            <AddCategoryForm />
          </div>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Edit Categories</h2>
          <div className="bg-gray-100 p-4 flex items-center justify-center flex-col rounded">
            <EditCategoryPage />
          </div>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Add Product</h2>
          <div className="bg-gray-100 p-4 flex items-center justify-center flex-col rounded">
            <AddProductForm />
          </div>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Edit Product</h2>
          <div className="bg-gray-100 p-4 flex items-center justify-center flex-col rounded">
            <EditProductPage />
          </div>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Edit Product Stock</h2>
          <div className="bg-gray-100 p-4 flex items-center justify-center flex-col rounded lg:min-h-[555.27px]">
            <EditProductStock />
          </div>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Add Banner</h2>
          <div className="bg-gray-100 flex items-center rounded justify-center flex-col ">
            <AddBannerForm />
          </div>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Banners</h2>
          <div className="bg-gray-100 flex items-center rounded justify-center">
            <EditBannersPage />
          </div>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Add Promo Code</h2>
          <div className="bg-gray-100 flex items-center rounded justify-center p-4">
            <AddPromoCodeForm />
          </div>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Edit Promo Codes</h2>
          <div className="bg-gray-100 flex items-center rounded justify-center">
            <EditPromoCodePage />
          </div>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Top Viewed Product</h2>
          <div className="bg-gray-100 flex items-center rounded justify-center">
            <ProductViewsPage />
          </div>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Top Purchased Product</h2>
          <div className="bg-gray-100 flex items-center rounded justify-center">
            Top Purchased Product Data
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
