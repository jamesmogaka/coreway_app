import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";
import { StatsCards } from "../components/admin/StatsCards";
import { ShopHeader } from "../components/ShopHeader";
import { useProducts } from "../hooks/useProducts";

export function AdminLayout() {
  // Fetch products and calculate stats
  const { products, loading, error } = useProducts();
  
  // Calculate stats
  const totalProducts = products?.length || 0;
  const totalOrders = 0; // You'll need to fetch orders data
  const pendingOrders = 0; // You'll need to fetch orders data
  const totalRevenue = 0; // You'll need to fetch orders data

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Shop Header */}
      <ShopHeader />
      
      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <Sidebar />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 mb-6">Welcome! Here's your shop's summary.</p>
            
            <StatsCards 
              totalProducts={totalProducts}
              totalOrders={totalOrders}
              pendingOrders={pendingOrders}
              totalRevenue={totalRevenue}
            />
            
            {/* This Outlet is where the nested routes will be rendered */}
            <div className="mt-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
