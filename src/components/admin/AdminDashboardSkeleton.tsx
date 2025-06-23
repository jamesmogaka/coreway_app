import { Skeleton } from "../ui/skeleton";

export function AdminDashboardSkeleton() {
	return (
		<div className="w-full animate-pulse">
			<div className="flex justify-between items-center mb-6">
				<Skeleton className="h-8 w-1/4 bg-gray-700" />
				<div className="flex space-x-4">
					<Skeleton className="h-10 w-28 bg-gray-700 rounded-md" />
					<Skeleton className="h-10 w-48 bg-gray-700 rounded-md" />
				</div>
			</div>

			<div className="space-y-4">
				<div className="flex border-b border-white/20">
					<Skeleton className="h-10 w-24 mr-4 bg-gray-700" />
					<Skeleton className="h-10 w-24 mr-4 bg-gray-700" />
					<Skeleton className="h-10 w-24 bg-gray-700" />
				</div>

				<div className="border border-gray-700 rounded-md p-4">
					<div className="flex justify-end mb-4">
						<Skeleton className="h-10 w-32 bg-gray-700 rounded-md" />
					</div>
					<div className="w-full">
						<div className="grid grid-cols-6 p-4 font-semibold border-b border-gray-700">
							<Skeleton className="h-6 w-5/6 bg-gray-700" />
							<Skeleton className="h-6 w-5/6 bg-gray-700" />
							<Skeleton className="h-6 w-5/6 bg-gray-700" />
							<Skeleton className="h-6 w-5/6 bg-gray-700" />
							<Skeleton className="h-6 w-5/6 bg-gray-700" />
							<Skeleton className="h-6 w-5/6 bg-gray-700" />
						</div>
						<div className="divide-y divide-gray-700">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="grid grid-cols-6 p-4 items-center">
									<Skeleton className="h-10 w-10 rounded-full bg-gray-700" />
									<Skeleton className="h-6 w-5/6 bg-gray-700" />
									<Skeleton className="h-6 w-3/4 bg-gray-700" />
									<Skeleton className="h-6 w-1/2 bg-gray-700" />
									<Skeleton className="h-6 w-5/6 bg-gray-700" />
									<div className="flex space-x-2">
										<Skeleton className="h-8 w-8 bg-gray-700 rounded-md" />
										<Skeleton className="h-8 w-8 bg-gray-700 rounded-md" />
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
