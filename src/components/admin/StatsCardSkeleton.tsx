import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

export function StatsCardSkeleton() {
	return (
		<Card className="bg-[#129990] border-0 animate-pulse">
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<Skeleton className="h-4 w-24 bg-gray-700" />
				<Skeleton className="h-4 w-4 bg-gray-700" />
			</CardHeader>
			<CardContent>
				<Skeleton className="h-8 w-16 bg-gray-700 mb-2" />
				<Skeleton className="h-3 w-20 bg-gray-700" />
			</CardContent>
		</Card>
	);
}
