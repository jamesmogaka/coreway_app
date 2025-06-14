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
		<Card>
			<CardHeader>
				<CardTitle>Orders</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="rounded-md border">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map(order => (
								<TableRow key={order.id}>
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
											<SelectTrigger className="w-32">
												<SelectValue placeholder="Status" />
											</SelectTrigger>
											<SelectContent>
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
		pending: "bg-yellow-100 text-yellow-800",
		processing: "bg-blue-100 text-blue-800",
		shipped: "bg-purple-100 text-purple-800",
		delivered: "bg-green-100 text-green-800",
	};

	return (
		<span
			className={`px-2 py-1 text-xs rounded-full ${statusStyles[status]}`}>
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}
