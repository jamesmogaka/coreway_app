import type React from "react";
import * as react from "react";

export const ShopPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Shop Our Toolkit & Accessories
				</h1>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/e0e7ff/3730a3?text=VDC+Toolkit"
							alt="VDC Toolkit"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								VDC Toolkit (Ages 4-9)
							</h3>
							<p className="text-gray-600 mb-4">
								The complete foundational toolkit for early
								development.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-blue-600">
									$49.99
								</span>
								<button className="bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/d1fae5/047857?text=VDC+Toolkit"
							alt="VDC Toolkit"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								VDC Toolkit (Ages 10-18)
							</h3>
							<p className="text-gray-600 mb-4">
								The complete transitional toolkit for
								adolescents.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-green-600">
									$49.99
								</span>
								<button className="bg-green-600 text-white hover:bg-green-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/fef3c7/92400e?text=Affirmation+Cards"
							alt="Affirmation Cards"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								Affirmation Card Pack
							</h3>
							<p className="text-gray-600 mb-4">
								A set of 50 affirmation cards to build
								self-belief.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-yellow-600">
									$14.99
								</span>
								<button className="bg-yellow-600 text-white hover:bg-yellow-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/fee2e2/991b1b?text=Reward+Charts"
							alt="Reward Charts"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								My VDC Reward Charts (Pack of 5)
							</h3>
							<p className="text-gray-600 mb-4">
								Track progress and celebrate growth with these
								visual charts.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-red-600">
									$9.99
								</span>
								<button className="bg-red-600 text-white hover:bg-red-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);
