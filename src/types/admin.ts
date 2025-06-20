// Re-export Product type from product.ts to maintain consistency
import type { Product } from "./product";

export type { Product };

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

// Type for the raw data fetched from Supabase
export type FetchedOrder = {
	id: string;
	created_at: string;
	delivery_address: string; // This is a JSON string
	total: number;
	status: OrderStatus;
	is_paid: boolean;
	order_items: {
		quantity: number;
		unit_price: number;
		products: {
			name: string;
		} | null;
	}[];
};

export type ShippingAddress = {
	email: string;
	firstName: string;
	lastName: string;
	county: string;
	subcounty: string;
	ward: string;
	streetAddress: string;
	areaCode: string;
	phoneNumber: string;
};

export type Order = {
	id: string;
	shippingInfo: string;
	total: number;
	status: OrderStatus;
	date: string;
	items: { name: string; quantity: number; price: number }[];
	isPaid: boolean;
	shippingAddress: ShippingAddress;
};
