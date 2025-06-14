import { Routes, Route, Navigate } from "react-router-dom";
import { ShopPage } from "../pages/ShopPage";
import { ProductDetail } from "../pages/ProductDetail";
import { AdminDashboard } from "../pages/AdminDashboard";
import UsersPage from "../pages/admin/Users";
import { ContactsPage } from "../pages/admin/ContactsPage";
import { ShopHeader } from "./ShopHeader";
import { Auth } from "../pages/Auth";
import { CartSidebar } from "./CartSidebar";
import { useCart } from "../contexts/useCart";
import { useAuth } from "../contexts/AuthContext";

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAdmin, loading } = useAuth();

	if (loading) {
		return <div>Loading...</div>; // Or a loading spinner
	}

	if (!isAdmin) {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export function ShopLayout() {
	const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity } =
		useCart();

	return (
		<div className="min-h-screen w-full">
			<ShopHeader />
			<main>
				<Routes>
					<Route index element={<ShopPage />} />
					<Route path="product/:id" element={<ProductDetail />} />
					<Route path="auth" element={<Auth />} />
					<Route
						path="admin"
						element={
							<ProtectedAdminRoute>
								<AdminDashboard />
							</ProtectedAdminRoute>
						}
					/>
					<Route
						path="admin/users"
						element={
							<ProtectedAdminRoute>
								<UsersPage />
							</ProtectedAdminRoute>
						}
					/>
					<Route
						path="admin/contacts"
						element={
							<ProtectedAdminRoute>
								<ContactsPage />
							</ProtectedAdminRoute>
						}
					/>
					<Route path="*" element={<div>Page not found</div>} />
				</Routes>
			</main>
			<CartSidebar
				isOpen={isCartOpen}
				onClose={closeCart}
				cartItems={cartItems}
				onRemoveItem={removeFromCart}
				onQuantityChange={updateQuantity}
			/>
		</div>
	);
}
