import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/admin/Sidebar";
import { StatsCards } from "../components/admin/StatsCards";
import { useProducts } from "../hooks/useProducts";
import { useOrders } from "../hooks/useOrders";
import { AdminProvider } from "../contexts/AdminContext";
import { AdminLayoutSkeleton } from "../components/admin/AdminLayoutSkeleton";
import { BackgroundGradient } from "../components/ui/BackgroundGradient";

export function AdminLayout() {
	// Fetch products and orders
	const {
		products,
		loading: productsLoading,
		error: productsError,
	} = useProducts();
	const {
		orders,
		loading: ordersLoading,
		error: ordersError,
		refetch: refetchOrders,
	} = useOrders();

	// Calculate stats
	const totalProducts = products?.length || 0;
	const totalOrders = orders?.length || 0;
	const pendingOrders =
		orders?.filter(order => order.isPaid && order.status === "pending")
			.length || 0;
	const totalRevenue =
		orders
			?.filter(order => order.isPaid)
			.reduce((sum, order) => sum + order.total, 0) || 0;

	if (productsLoading || ordersLoading) return <AdminLayoutSkeleton />;
		if (productsError || ordersError) {
		return (
			<div className="flex items-center justify-center h-screen bg-[#096B68] text-red-400 text-2xl">
				Error: {productsError?.message || ordersError?.message}
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen bg-transparent relative">
			<BackgroundGradient />
			{/* Main Content Area with Sidebar */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar */}
				<aside className="w-64 bg-[#129990] border-r-0">
					<Sidebar />
				</aside>

				{/* Main Content */}
				<main className="flex-1 overflow-y-auto p-6">
					<div className="max-w-7xl mx-auto">
						<h1 className="text-3xl font-bold mb-2 text-[#FFD59A]">
							Admin Dashboard
						</h1>
						<p className="text-[#F5F5F5] mb-6">
							Welcome! Here's your shop's summary.
						</p>

						<StatsCards
							totalProducts={totalProducts}
							totalOrders={totalOrders}
							pendingOrders={pendingOrders}
							totalRevenue={totalRevenue}
						/>

						{/* This Outlet is where the nested routes will be rendered */}
						<div className="mt-6">
							<AdminProvider
								value={{
									orders,
									refetchOrders,
									totalProducts,
								}}>
								<Outlet />
							</AdminProvider>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
