import type { Product } from "../types/product";

export interface CartItem {
	id: string;
	name: string;
	product: Product;
	quantity: number;
	addedAt: string;
}

export interface CartContextType {
	cartItems: CartItem[];
	isCartOpen: boolean;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
	addToCart: (product: Product, quantity?: number) => void;
	removeFromCart: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	clearCart: () => void;
	cartTotal: number;
	itemCount: number;
}
