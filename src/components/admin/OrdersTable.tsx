import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
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
}

type OrdersTableProps = {
	onStatusChange: (orderId: string, status: OrderStatus) => void;
};

export function OrdersTable({ onStatusChange }: OrdersTableProps) {
	const [orders, setOrders] = useState<OrderWithShipping[]>([]);
	const [selectedOrder, setSelectedOrder] =
		useState<OrderWithShipping | null>(null);

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

	return (
		<>
			<Card className="bg-[#129990] border-0 text-[#F5F5F5] text-base">
				<CardHeader>
					<CardTitle className="text-2xl font-semibold text-[#FFD59A]">
						Orders
					</CardTitle>
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
									<TableHead className="text-right text-[#FFD59A]">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{orders.length > 0 ? (
									orders.map(order => (
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
				onOpenChange={isOpen => !isOpen && setSelectedOrder(null)}>
				<DialogContent className="bg-[#129990] border-0 text-[#F5F5F5]">
					{selectedOrder && (
						<>
							<DialogHeader>
								<DialogTitle className="text-2xl font-semibold text-[#FFD59A]">
									Order Details
								</DialogTitle>
							</DialogHeader>
							<div>
								<h3 className="text-lg font-semibold text-[#FFD59A]">
									Shipping Address
								</h3>
								<p>
									{selectedOrder.shippingAddress.firstName +
										" " +
										selectedOrder.shippingAddress.lastName}
								</p>
								<p>
									{
										selectedOrder.shippingAddress
											.streetAddress
									}
								</p>
								<p>
									{selectedOrder.shippingAddress.county},{" "}
									{selectedOrder.shippingAddress.subcounty}{" "}
									{selectedOrder.shippingAddress.ward}
								</p>
								<p>{selectedOrder.shippingAddress.areaCode}</p>
								<p>
									{selectedOrder.shippingAddress.phoneNumber}
								</p>
							</div>
							<div>
								<h3 className="text-lg font-semibold text-[#FFD59A]">
									Items
								</h3>
								<ul>
									{selectedOrder.items.map((item, index) => (
										<li key={index}>
											{item.quantity} x {item.name} @ KSh.{" "}
											{item.price.toFixed(2)}
										</li>
									))}
								</ul>
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
			className={`px-2 py-1 text-xs rounded-full ${statusStyles[status]}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}
