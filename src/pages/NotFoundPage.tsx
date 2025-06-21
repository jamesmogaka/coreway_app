import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";

export function NotFoundPage() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-teal-900 to-teal-400 p-4">
			<div className="text-center max-w-md space-y-8">
				<div className="flex justify-center">
					{/* Simple coming soon illustration (clock icon) */}
					<svg
						width="80"
						height="80"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="text-yellow-50 mb-2">
						<circle cx="12" cy="12" r="9" strokeWidth="2" />
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M12 7v5l3 2"
						/>
					</svg>
				</div>
				<h1 className="text-4xl font-extrabold text-yellow-50">
					Coming Soon
				</h1>
				<p className="text-lg text-yellow-50">
					We're working hard to bring you this feature. Stay tuned for
					exciting updates!
				</p>
				<Button className="mt-6 px-8 py-3 text-lg rounded-full shadow-lg bg-yellow-50 hover:bg-yellow-600 text-teal-900 transition-all duration-200">
					<HashLink to="/#home">Back to Home</HashLink>
				</Button>
			</div>
		</div>
	);
}
