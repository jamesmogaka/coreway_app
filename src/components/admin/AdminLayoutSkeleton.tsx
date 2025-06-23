import { Skeleton } from "../ui/skeleton";
import { StatsCardSkeleton } from "./StatsCardSkeleton";

export function AdminLayoutSkeleton() {
	return (
		<div className="flex flex-col min-h-screen bg-[#096B68]">
			<div className="flex flex-1 overflow-hidden animate-pulse">
				<aside className="w-64 bg-[#129990] p-6">
					<Skeleton className="h-8 w-3/4 mb-8 bg-gray-700" />
					<div className="space-y-4">
						<Skeleton className="h-6 w-full bg-gray-700" />
						<Skeleton className="h-6 w-full bg-gray-700" />
						<Skeleton className="h-6 w-5/6 bg-gray-700" />
						<Skeleton className="h-6 w-full bg-gray-700" />
					</div>
				</aside>
				<main className="flex-1 overflow-y-auto p-6">
					<Skeleton className="h-10 w-1/4 mb-2 bg-gray-700" />
					<Skeleton className="h-6 w-1/2 mb-6 bg-gray-700" />

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
						<StatsCardSkeleton />
						<StatsCardSkeleton />
						<StatsCardSkeleton />
						<StatsCardSkeleton />
					</div>

					<div className="mt-6">
						<Skeleton className="h-96 w-full bg-gray-700" />
					</div>
				</main>
			</div>
		</div>
	);
}
