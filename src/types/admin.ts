// Re-export Product type from product.ts to maintain consistency
import type { Product } from "./product";

export type { Product };

export type Order = {
	id: string;
	shippingInfo: string;
	total: number;
	status: "pending" | "processing" | "shipped" | "delivered";
	date: string;
	items: { name: string; quantity: number; price: number }[];
};

export type OrderStatus = Order["status"];
