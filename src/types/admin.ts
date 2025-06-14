// Re-export Product type from product.ts to maintain consistency
import type { Product } from "./product";

export type { Product };

export type Order = {
	id: string;
	customerName: string;
	total: number;
	status: "pending" | "processing" | "shipped" | "delivered";
	date: string;
	items: { name: string; quantity: number; price: number }[];
};

export type OrderStatus = Order["status"];

export const initialOrders: Order[] = [
	{
		id: "ORD-001",
		customerName: "John Doe",
		total: 59.98,
		status: "pending",
		date: "2025-06-10",
		items: [{ name: "Organic Cotton T-Shirt", quantity: 2, price: 29.99 }],
	},
];
