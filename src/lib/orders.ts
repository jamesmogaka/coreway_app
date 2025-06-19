import { supabase } from "./supabase";
import type {
	ShippingInfo,
	PaymentInfo,
	CartItemProps,
} from "@/components/checkout/types";

interface OrderInsert {
	status: string;
	total: number;
	shipping_address: ShippingInfo;
	payment_method: "visa" | "mpesa";
	payment_status: string;
	user_id?: string;
}

export async function createOrder(
	shippingInfo: ShippingInfo,
	paymentInfo: PaymentInfo,
	cartItems: CartItemProps[]
) {
	try {
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const total =
			cartItems.reduce(
				(acc, item) => acc + item.price * item.quantity,
				0
			) + 500;

		const orderPayload: OrderInsert = {
			status: "pending",
			total,
			shipping_address: shippingInfo,
			payment_method: paymentInfo.paymentMethod,
			payment_status: "paid",
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
			price: item.price,
		}));

		const { error: orderItemsError } = await supabase
			.from("order_items")
			.insert(orderItems);

		if (orderItemsError) throw orderItemsError;

		return { success: true, orderId };
	} catch (error) {
		console.error("Error creating order:", error);
		return { success: false, error };
	}
}
