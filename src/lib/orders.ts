import { supabase } from "./supabase";
import type {
	ShippingInfo,
	PaymentInfo,
	CartItemProps,
} from "@/components/checkout/types";

interface OrderInsert {
	user_id?: string;
	delivery_address: string;
	is_paid: boolean;
	status: "pending" | "shipped" | "delivered";
}

export async function createOrder(
	shippingInfo: ShippingInfo,
	paymentInfo: PaymentInfo,
	cartItems: CartItemProps[],
	cartTotal: number,
	shippingFee: number
) {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const total = cartTotal + shippingFee;

		const orderPayload: OrderInsert = {
			status: "pending",
			delivery_address: JSON.stringify(shippingInfo),
			is_paid: false,
		};

		if (user) {
			orderPayload.user_id = user.id;
		}

		const { data: newOrder, error: orderError } = await supabase
			.from("orders")
			.insert([orderPayload])
			.select()
			.single();

		if (orderError) throw orderError;

		const orderId = newOrder.id;

		const orderItems = cartItems.map(item => ({
			order_id: orderId,
			product_id: item.id,
			quantity: item.quantity,
			unit_price: item.price,
		}));

		const { error: orderItemsError } = await supabase
			.from("order_items")
			.insert(orderItems);

		if (orderItemsError) throw orderItemsError;
		//
		//Proceed to initiate the payment
		initiate_payment(paymentInfo, total);
		return { success: true, orderId };
	} catch (error) {
		console.error("Error creating order:", error);
		return { success: false, error };
	}
}
function initiate_payment(paymentInfo: PaymentInfo, amount: number) {
	console.log(`Initiating payment for ${amount} on ${paymentInfo}`);
}

export async function getOrders() {
	try {
		const { data, error } = await supabase.from("orders").select(`
				*,
				order_items (
					quantity,
					unit_price,
					products (
						name
					)
				)
			`);
		if (error) throw error;

		return { success: true, data };
	} catch (error) {
		console.error("Error fetching orders:", error);
		return { success: false, error };
	}
}
