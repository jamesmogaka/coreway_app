import { useState } from "react";
import type { ReactNode } from "react";
import { CartContext } from "./cart-context";
import type { CartContextType, CartItem } from "./cart-context.types";
import type { Product } from "../types/product";

interface CartProviderProps {
	children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);
	const toggleCart = () => setIsCartOpen(prev => !prev);

	const itemCount = cartItems.reduce(
		(total, item) => total + item.quantity,
		0
	);
	const cartTotal = cartItems.reduce(
		(total, item) => total + item.product.price * item.quantity,
		0
	);

	const addToCart = (product: Product, quantity: number = 1) => {
		setCartItems(prevItems => {
			const existingItem = prevItems.find(
				item => item.product.product_id === product.product_id
			);

			if (existingItem) {
				return prevItems.map(item =>
					item.product.product_id === product.product_id
						? { ...item, quantity: item.quantity + quantity }
						: item
				);
			}

			const newCartItem: CartItem = {
				id: product.product_id,
				name: product.name,
				product,
				quantity,
				addedAt: new Date().toISOString(),
			};

			return [...prevItems, newCartItem];
		});
	};

	const removeFromCart = (itemId: string) => {
		setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
	};

	const updateQuantity = (itemId: string, newQuantity: number) => {
		if (newQuantity <= 0) {
			removeFromCart(itemId);
			return;
		}

		setCartItems(prevItems =>
			prevItems.map(item =>
				item.id === itemId ? { ...item, quantity: newQuantity } : item
			)
		);
	};

	const clearCart = () => {
		setCartItems([]);
	};

	const contextValue: CartContextType = {
		cartItems,
		isCartOpen,
		openCart,
		closeCart,
		toggleCart,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		cartTotal,
		itemCount,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
}
