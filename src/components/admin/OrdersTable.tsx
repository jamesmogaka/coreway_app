import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import { getOrders } from "@/lib/orders";
import { useEffect, useState } from "react";
import type { Order, OrderStatus } from "../../types/admin";

// Type for the raw data fetched from Supabase
type FetchedOrder = {
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
type ShippingAddress = {
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

// Extended Order type to include the shipping address
interface OrderWithShipping extends Order {
	shippingAddress: ShippingAddress;
	isPaid: boolean;
}

type OrdersTableProps = {
	onStatusChange: (orderId: string, status: OrderStatus) => void;
};

export function OrdersTable({ onStatusChange }: OrdersTableProps) {
	const [orders, setOrders] = useState<OrderWithShipping[]>([]);
	const [selectedOrder, setSelectedOrder] =
		useState<OrderWithShipping | null>(null);
	const [paymentFilter, setPaymentFilter] = useState<
		"all" | "paid" | "unpaid"
	>("all");

	useEffect(() => {
		const fetchOrders = async () => {
			const { data, success } = await getOrders();
			if (success && data) {
				const formattedOrders: OrderWithShipping[] = (
					data as FetchedOrder[]
				).map((order: FetchedOrder) => {
					const shippingInfo: ShippingAddress = JSON.parse(
						order.delivery_address
					);
					const total = order.order_items.reduce(
						(sum, item) => sum + item.unit_price * item.quantity,
						0
					);
					return {
						id: order.id,
						shippingInfo: order.delivery_address,
						date: new Date(order.created_at).toLocaleDateString(),
						total,
						status: order.status,
						isPaid: order.is_paid,
						items: order.order_items.map(item => ({
							name: item.products?.name || "Unknown Product",
							quantity: item.quantity,
							price: item.unit_price,
						})),
						shippingAddress: shippingInfo,
					};
				});
				setOrders(formattedOrders);
			}
		};

		fetchOrders();
	}, []);

	const handleRowClick = (order: OrderWithShipping) => {
		setSelectedOrder(order);
	};

	const filteredOrders = orders.filter(order => {
		if (paymentFilter === "all") return true;
		if (paymentFilter === "paid") return order.isPaid;
		if (paymentFilter === "unpaid") return !order.isPaid;
	});

	return (
		<>
			<Card className="bg-[#129990] border-0 text-[#F5F5F5] text-base">
				<CardHeader>
					<div className="flex justify-between items-center">
						<CardTitle className="text-2xl font-semibold text-[#FFD59A]">
							Orders
						</CardTitle>
						<div className="flex items-center gap-2">
							<Button
								onClick={() => setPaymentFilter("all")}
								className={`px-3 py-1 h-auto rounded-md text-sm font-medium transition-colors ${
									paymentFilter === "all"
										? "bg-yellow-50 text-teal-900 hover:bg-yellow-50/90"
										: "text-yellow-50 hover:bg-yellow-50/10"
								}`}
							>
								All
							</Button>
							<Button
								onClick={() => setPaymentFilter("paid")}
								className={`px-3 py-1 h-auto rounded-md text-sm font-medium transition-colors ${
									paymentFilter === "paid"
										? "bg-yellow-50 text-teal-900 hover:bg-yellow-50/90"
										: "text-yellow-50 hover:bg-yellow-50/10"
								}`}
							>
								Paid
							</Button>
							<Button
								onClick={() => setPaymentFilter("unpaid")}
								className={`px-3 py-1 h-auto rounded-md text-sm font-medium transition-colors ${
									paymentFilter === "unpaid"
										? "bg-yellow-50 text-teal-900 hover:bg-yellow-50/90"
										: "text-yellow-50 hover:bg-yellow-50/10"
								}`}
							>
								Unpaid
							</Button>
						</div>
					</div>
				</CardHeader>
				<CardContent>
					<div className="rounded-md border border-white/20">
						<Table>
							<TableHeader>
								<TableRow className="border-b border-white/20 hover:bg-transparent">
									<TableHead className="text-[#FFD59A]">
										Order ID
									</TableHead>
									<TableHead className="text-[#FFD59A]">
										Customer
									</TableHead>
									<TableHead className="text-[#FFD59A]">
										Date
									</TableHead>
									<TableHead className="text-[#FFD59A]">
										Total
									</TableHead>
									<TableHead className="text-[#FFD59A]">
										Status
									</TableHead>
									<TableHead className="text-[#FFD59A]">
										Payment
									</TableHead>
									<TableHead className="text-right text-[#FFD59A]">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredOrders.length > 0 ? (
									filteredOrders.map(order => (
										<TableRow
											key={order.id}
											className="border-b-0 even:bg-white/5 hover:bg-white/10 cursor-pointer"
											onClick={() =>
												handleRowClick(order)
											}>
											<TableCell className="font-medium">
												{order.id}
											</TableCell>
											<TableCell>
												{order.shippingAddress
													.firstName +
													" " +
													order.shippingAddress
														.lastName}
											</TableCell>
											<TableCell>{order.date}</TableCell>
											<TableCell>
												KSh. {order.total.toFixed(2)}
											</TableCell>
											<TableCell>
												<StatusBadge
													status={order.status}
												/>
											</TableCell>
											<TableCell>
												<PaymentStatusBadge isPaid={order.isPaid} />
											</TableCell>
											<TableCell className="text-right">
												<Select
													value={order.status}
													onValueChange={(
														value: OrderStatus
													) =>
														onStatusChange(
															order.id,
															value
														)
													}>
													<SelectTrigger className="w-32 bg-black/20 border-[#C2EAE7] text-[#F5F5F5] focus:ring-1 focus:ring-[#FFD59A] focus:ring-offset-0">
														<SelectValue placeholder="Status" />
													</SelectTrigger>
													<SelectContent className="bg-[#129990] border-[#C2EAE7] text-[#F5F5F5]">
														<SelectItem value="pending">
															Pending
														</SelectItem>
														<SelectItem value="processing">
															Processing
														</SelectItem>
														<SelectItem value="shipped">
															Shipped
														</SelectItem>
														<SelectItem value="delivered">
															Delivered
														</SelectItem>
													</SelectContent>
												</Select>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={6}
											className="text-center">
											No orders found.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
			<Dialog
				open={!!selectedOrder}
				onOpenChange={isOpen => !isOpen && setSelectedOrder(null)}
			>
				<DialogContent className="bg-[#129990] border-0 text-[#F5F5F5] sm:max-w-2xl">
					{selectedOrder && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-semibold text-[#FFD59A]">
									Order Details
								</DialogTitle>
								<DialogDescription className="text-sm text-gray-300">
									Detailed information for order #
									{selectedOrder.id}.
								</DialogDescription>
							</DialogHeader>
							<div className="grid gap-6 py-4">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-[#FFD59A] border-b border-white/20 pb-2">
											Shipping Address
										</h3>
										<div className="space-y-2 text-sm">
											<p className="font-medium">
												{
													selectedOrder.shippingAddress
														.firstName
												}{' '}
												{
													selectedOrder.shippingAddress
														.lastName
												}
											</p>
											<p>
												{
													selectedOrder.shippingAddress
														.streetAddress
												}
											</p>
											<p>
												{
													selectedOrder.shippingAddress
														.subcounty
												}
												,{' '}
												{
													selectedOrder.shippingAddress
														.ward
												}
											</p>
											<p>
												{
													selectedOrder.shippingAddress
														.county
												}
											</p>
											<p className="pt-2 text-gray-300">
												<span className="font-medium text-gray-200">
													Email:
												</span>{' '}
												{
													selectedOrder.shippingAddress
														.email
												}
											</p>
											<p className="text-gray-300">
												<span className="font-medium text-gray-200">
													Phone:
												</span>{' '}
												{
													selectedOrder.shippingAddress
														.phoneNumber
												}
											</p>
										</div>
									</div>
									<div className="space-y-4">
										<h3 className="text-lg font-semibold text-[#FFD59A] border-b border-white/20 pb-2">
											Order Summary
										</h3>
										<div className="flex items-center justify-between text-sm">
											<StatusBadge status={selectedOrder.status} />
											<PaymentStatusBadge isPaid={selectedOrder.isPaid} />
										</div>
										<div className="space-y-2">
											{selectedOrder.items.map(
												(item, index) => (
													<div
														key={index}
														className="flex justify-between items-center text-sm"
													>
														<p>
															{item.quantity} x{' '}
															{item.name}
														</p>
														<p className="font-mono">
															KSh.{' '}
															{item.price.toFixed(2)}
														</p>
													</div>
												)
											)}
										</div>
										<div className="border-t border-white/20 pt-4 flex justify-between items-center font-bold text-lg">
											<p className="text-[#FFD59A]">Total</p>
											<p className="text-[#FFD59A] font-mono">
												KSh.{' '}
												{selectedOrder.total.toFixed(2)}
											</p>
										</div>
									</div>
								</div>
							</div>
						</>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
}

type StatusBadgeProps = {
	status: OrderStatus;
};

function StatusBadge({ status }: StatusBadgeProps) {
	const statusStyles = {
		pending: "bg-yellow-400/20 text-yellow-300",
		processing: "bg-blue-400/20 text-blue-300",
		shipped: "bg-purple-400/20 text-purple-300",
		delivered: "bg-green-400/20 text-green-300",
	};

	return (
		<span
			className={`px-2 py-1 text-xs rounded-full ${statusStyles[status]}`}
		>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}

type PaymentStatusBadgeProps = {
	isPaid: boolean;
};

function PaymentStatusBadge({ isPaid }: PaymentStatusBadgeProps) {
	const text = isPaid ? "Paid" : "Unpaid";
	const style = isPaid
		? "bg-green-400/20 text-green-300"
		: "bg-red-400/20 text-red-300";

	return (
		<span className={`px-2 py-1 text-xs rounded-full ${style}`}>
			{text}
		</span>
	);
}
