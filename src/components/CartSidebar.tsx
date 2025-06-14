import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { CartItem as CartItemType } from "../contexts/cart-context.types";
import { CartItem } from "./CartItem";

interface CartSidebarProps {
	isOpen: boolean;
	onClose: () => void;
	cartItems: CartItemType[];
	onRemoveItem: (cartItemId: string) => void;
	onQuantityChange: (cartItemId: string, newQuantity: number) => void;
}

export function CartSidebar({
	isOpen,
	onClose,
	cartItems,
	onRemoveItem,
	onQuantityChange,
}: CartSidebarProps) {
	const navigate = useNavigate();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	const calculateTotal = () => {
		return cartItems.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0
		);
	};

	const handleCheckout = () => {
		if (cartItems.length === 0) {
			alert("Your cart is empty!");
			return;
		}
		onClose();
		navigate("/shop/checkout");
	};

	if (!isMounted) return null;

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40 ${
					isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={onClose}
			/>

			{/* Sidebar */}
			<div
				className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				<div className="h-full flex flex-col">
					<div className="flex items-center justify-between px-6 py-4 border-b">
						<h2 className="text-lg font-medium text-gray-900">
							Shopping Cart
						</h2>
						<button
							onClick={onClose}
							className="text-gray-500 hover:text-gray-700">
							<span className="sr-only">Close cart</span>
							<svg
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>

					<div className="flex-1 overflow-y-auto px-6 py-4">
						{cartItems.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-gray-600">
									Your cart is empty
								</p>
							</div>
						) : (
							<ul className="divide-y divide-gray-200">
								{cartItems.map(item => (
									<li key={item.id}>
										<CartItem
											item={item}
											onRemoveItem={() =>
												onRemoveItem(item.id)
											}
											onQuantityChange={newQuantity =>
												onQuantityChange(
													item.id,
													newQuantity
												)
											}
										/>
									</li>
								))}
							</ul>
						)}
					</div>

					<div className="border-t border-gray-200 px-6 py-4">
						<div className="flex justify-between text-base font-medium text-gray-900 mb-4">
							<p>Subtotal</p>
							<p>KSh.{calculateTotal().toFixed(2)}</p>
						</div>
						<button
							onClick={handleCheckout}
							disabled={cartItems.length === 0}
							className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
								cartItems.length === 0
									? "bg-gray-400 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700"
							}`}>
							Checkout
						</button>
						<div className="mt-4 flex justify-center text-sm text-center text-gray-500">
							<p>
								or{" "}
								<button
									type="button"
									onClick={onClose}
									className="text-blue-600 font-medium hover:text-blue-500">
									Continue Shopping
									<span aria-hidden="true"> &rarr;</span>
								</button>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
