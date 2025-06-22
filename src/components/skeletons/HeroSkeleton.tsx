import { Skeleton } from "../ui/skeleton";

export function HeroSkeleton() {
	return (
		<section
			id="home"
			className="pt-2 sm:pt-4 lg:pt-8 pb-20 sm:pb-24 lg:pb-32 animate-pulse">
			<div className="container mx-auto px-4">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
					<div className="space-y-6">
						<div className="space-y-4">
							<Skeleton className="h-6 w-32 bg-gray-700" />
							<Skeleton className="h-12 w-full bg-gray-700" />
							<Skeleton className="h-8 w-full bg-gray-700" />
							<Skeleton className="h-6 w-3/4 bg-gray-700" />
						</div>

						<Skeleton className="h-24 w-full bg-gray-700 rounded-lg" />

						<div className="flex flex-col sm:flex-row flex-wrap gap-4">
							<Skeleton className="h-12 w-full sm:w-40 bg-gray-700" />
							<Skeleton className="h-12 w-full sm:w-40 bg-gray-700" />
							<Skeleton className="h-12 w-full sm:w-40 bg-gray-700" />
						</div>
					</div>

					<div className="relative order-first lg:order-last">
						<Skeleton className="w-2/3 h-[550px] mx-auto bg-gray-700 rounded-2xl" />
						<div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-10">
							<Skeleton className="w-48 h-20 bg-gray-600 rounded-lg" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
