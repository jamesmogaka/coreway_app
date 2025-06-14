import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { PackageIcon, ShoppingCartIcon, ClockIcon, DollarSignIcon } from ".";

type StatsCardsProps = {
	totalProducts: number;
	totalOrders: number;
	pendingOrders: number;
	totalRevenue: number;
};

export function StatsCards({
	totalProducts,
	totalOrders,
	pendingOrders,
	totalRevenue,
}: StatsCardsProps) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">
						Total Products
					</CardTitle>
					<PackageIcon className="h-4 w-4 text-gray-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalProducts}</div>
					<p className="text-xs text-gray-500">+5% from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">
						Total Orders
					</CardTitle>
					<ShoppingCartIcon className="h-4 w-4 text-gray-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{totalOrders}</div>
					<p className="text-xs text-gray-500">
						+12% from last month
					</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">
						Pending Orders
					</CardTitle>
					<ClockIcon className="h-4 w-4 text-gray-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{pendingOrders}</div>
					<p className="text-xs text-gray-500">Needs attention</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium">
						Total Revenue
					</CardTitle>
					<DollarSignIcon className="h-4 w-4 text-gray-500" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">
						KSh{totalRevenue.toFixed(2)}
					</div>
					<p className="text-xs text-gray-500">+8% from last month</p>
				</CardContent>
			</Card>
		</div>
	);
}
