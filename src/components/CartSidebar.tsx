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
				className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#129990] shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}`}>
				<div className="h-full flex flex-col rounded-l-lg">
					<div className="flex items-center justify-between px-6 py-4 border-b border-[#90D1CA]">
						<h2 className="text-lg font-bold text-[#FFD59A]">
							Your Cart
						</h2>
						<button
							onClick={onClose}
							className="text-[#F5F5F5] hover:text-[#C2EAE7]">
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

					<div className="flex-1 overflow-y-auto px-6 py-4 cart-scrollbar">
						{cartItems.length === 0 ? (
							<div className="text-center py-12">
								<p className="text-[#FFFBDE]">
									Your cart is empty
								</p>
							</div>
						) : (
							<ul className="divide-y divide-[#90D1CA]">
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

					<div className="border-t border-[#90D1CA] px-6 py-4">
						<div className="flex justify-between text-base font-medium text-[#FFFBDE] mb-4">
							<p className="font-bold text-[#FFD59A]">Total</p>
							<p>KSh.{calculateTotal().toFixed(2)}</p>
						</div>
						<button
							onClick={handleCheckout}
							disabled={cartItems.length === 0}
							className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium ${cartItems.length === 0
									? "bg-gray-500 text-gray-300 cursor-not-allowed"
									: "bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]"
								}`}>
							Checkout
						</button>
						<div className="mt-4 flex justify-center text-sm text-center text-[#FFFBDE]">
							<p>
								or{" "}
								<button
									type="button"
									onClick={onClose}
									className="font-medium text-[#FFD59A] hover:text-[#FFAD60]">
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
