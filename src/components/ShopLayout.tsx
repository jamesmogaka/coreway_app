import { Routes, Route, Navigate } from "react-router-dom";
import { ShopPage } from "../pages/ShopPage";
import ProductDetail from "../pages/ProductDetail";
import CheckoutPage from "../pages/CheckoutPage";
import { ShopHeader } from "./ShopHeader";
import { Auth } from "../pages/Auth";
import { CartSidebar } from "./CartSidebar";
import { useCart } from "../contexts/useCart";

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
					<Route path="checkout" element={<CheckoutPage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
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
