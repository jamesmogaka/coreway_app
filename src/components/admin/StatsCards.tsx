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
			<Card className="bg-[#129990] border-0">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium text-[#FFD59A]">
						Total Products
					</CardTitle>
					<PackageIcon className="h-4 w-4 text-[#FFFBDE]" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-[#F5F5F5]">{totalProducts}</div>
					<p className="text-xs text-[#C2EAE7]">+5% from last month</p>
				</CardContent>
			</Card>
			<Card className="bg-[#129990] border-0">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium text-[#FFD59A]">
						Total Orders
					</CardTitle>
					<ShoppingCartIcon className="h-4 w-4 text-[#FFFBDE]" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-[#F5F5F5]">{totalOrders}</div>
					<p className="text-xs text-[#C2EAE7]">
						+12% from last month
					</p>
				</CardContent>
			</Card>
			<Card className="bg-[#129990] border-0">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium text-[#FFD59A]">
						Pending Orders
					</CardTitle>
					<ClockIcon className="h-4 w-4 text-[#FFFBDE]" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-[#F5F5F5]">{pendingOrders}</div>
					<p className="text-xs text-[#C2EAE7]">Needs attention</p>
				</CardContent>
			</Card>
			<Card className="bg-[#129990] border-0">
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle className="text-sm font-medium text-[#FFD59A]">
						Total Revenue
					</CardTitle>
					<DollarSignIcon className="h-4 w-4 text-[#FFFBDE]" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold text-[#F5F5F5]">
						KSh{totalRevenue.toFixed(2)}
					</div>
					<p className="text-xs text-[#C2EAE7]">+8% from last month</p>
				</CardContent>
			</Card>
		</div>
	);
}
