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
import type { Order, OrderStatus } from "../../types/admin";

type OrdersTableProps = {
	orders: Order[];
	onStatusChange: (orderId: string, status: OrderStatus) => void;
};

export function OrdersTable({ orders, onStatusChange }: OrdersTableProps) {
	return (
				<Card className="bg-[#129990] border-0 text-[#F5F5F5] text-base">
			<CardHeader>
								<CardTitle className="text-2xl font-semibold text-[#FFD59A]">Orders</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border border-white/20">
					<Table>
						<TableHeader>
							<TableRow className="border-b border-white/20 hover:bg-transparent">
								<TableHead className="text-[#FFD59A]">Order ID</TableHead>
								<TableHead className="text-[#FFD59A]">Customer</TableHead>
								<TableHead className="text-[#FFD59A]">Date</TableHead>
								<TableHead className="text-[#FFD59A]">Total</TableHead>
								<TableHead className="text-[#FFD59A]">Status</TableHead>
								<TableHead className="text-right text-[#FFD59A]">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map(order => (
								<TableRow key={order.id} className="border-b-0 even:bg-white/5 hover:bg-white/10">
									<TableCell className="font-medium">
										{order.id}
									</TableCell>
									<TableCell>{order.customerName}</TableCell>
									<TableCell>{order.date}</TableCell>
									<TableCell>
										${order.total.toFixed(2)}
									</TableCell>
									<TableCell>
										<StatusBadge status={order.status} />
									</TableCell>
									<TableCell className="text-right">
										<Select
											value={order.status}
											onValueChange={(
												value: OrderStatus
											) =>
												onStatusChange(order.id, value)
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
							))}
						</TableBody>
					</Table>
				</div>
			</CardContent>
		</Card>
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
