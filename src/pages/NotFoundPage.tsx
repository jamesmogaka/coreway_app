import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";

export function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
			<div className="text-center max-w-md space-y-6">
				<div className="text-6xl font-bold text-gray-900">404</div>
				<h1 className="text-3xl font-bold text-gray-900">
					Page Not Found
				</h1>
				<p className="text-lg text-gray-600">
					Oops! The page you're looking for doesn't exist or has been
					moved.
				</p>
				<Button className="mt-6 px-6 py-3 text-lg">
					<HashLink to="/#home">Go Back Home</HashLink>
				</Button>
			</div>
		</div>
	);
}
