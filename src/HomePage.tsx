import type React from "react";
import * as react from "react";
import type { HomePageProps } from "./components";

export const HomePage: react.FC<HomePageProps> = ({ onPageChange }) => (
	<div className="fade-in">
		<section className="hero-bg text-white">
			<div className="bg-black bg-opacity-50">
				<div className="container mx-auto px-6 py-24 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Intentional Parenting for a Value-Driven Child
					</h1>
					<p className="text-lg md:text-xl mb-8">
						Nurture morally grounded, resilient, and successful
						children with the VDC Toolkit.
					</p>
					<a
						href="#toolkit"
						onClick={e => {
							e.preventDefault();
							onPageChange("toolkit");
							window.scrollTo(0, 0);
						}}
						className="bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-3 px-8 text-lg rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
						Discover the Toolkit
					</a>
				</div>
			</div>
		</section>
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-800">
						Your Companion for Effective Parenting
					</h2>
					<p className="text-gray-600 mt-4 max-w-2xl mx-auto">
						The Value Driven Child (VDC) parenting Toolkit is your
						essential companion for intentional and effective
						parenting. It is meticulously designed to equip parents
						and caregivers with proven methods to nurture morally
						grounded, resilient, and successful children in today’s
						ever-changing world.
					</p>
				</div>
				<div className="grid md:grid-cols-4 gap-8 text-center">
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-blue-600 mb-2">
							Affirm
						</h3>
						<p className="text-gray-600">
							Reinforce your child's positive self-identity by
							recognizing and celebrating their inherent worth.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-green-600 mb-2">
							Train
						</h3>
						<p className="text-gray-600">
							Introduce and educate your child on high-impact
							foundational core values.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-yellow-600 mb-2">
							Track
						</h3>
						<p className="text-gray-600">
							Monitor and assess your child's understanding and
							application of the values.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-red-600 mb-2">
							Reward
						</h3>
						<p className="text-gray-600">
							Use positive reinforcement to solidify desired
							values and behaviors.
						</p>
					</div>
				</div>
			</div>
		</section>
		<section className="py-20">
			<div className="container mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-800">
						Understand Your Child's Unique Design
					</h2>
					<p className="text-gray-600 mt-4 max-w-2xl mx-auto">
						The VDC Toolkit helps you discover your child's natural
						predispositions—Gold, Blue, Green, or Orange—allowing
						for personalized parenting that nurtures their
						individual strengths.
					</p>
				</div>
				<div className="flex justify-center flex-wrap gap-4">
					<span className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold">
						Gold
					</span>
					<span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
						Blue
					</span>
					<span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
						Green
					</span>
					<span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
						Orange
					</span>
				</div>
			</div>
		</section>
	</div>
);
