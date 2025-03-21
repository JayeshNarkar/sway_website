import AdminRouteNaviagates from "@/components/admin/home/AdminRouteNavigates";

async function AdminPage() {
  return (
    <div className="w-full flex items-center min-h-screen content-center justify-center flex-col">
      <AdminRouteNaviagates />
    </div>
  );
}

export default AdminPage;
