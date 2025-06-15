import * as React from "react";
import { useNavigate } from "react-router-dom";
import { HeroCarousel } from "../components/HeroCarousel";

const features = [
	{
		title: "Affirm",
		description:
			"Reinforce your child's positive self-identity by recognizing and celebrating their inherent worth.",
	},
	{
		title: "Train",
		description:
			"Equip your child with essential life skills and values through consistent guidance and practical lessons.",
	},
	{
		title: "Correct",
		description:
			"Guide your child with compassionate discipline that promotes learning and growth.",
	},
	{
		title: "Encourage",
		description:
			"Foster a growth mindset by celebrating efforts and providing supportive feedback.",
	},
];

export const HomePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div className="fade-in min-h-screen">
			{/* Hero Section - Dark Teal */}
			<section className="relative text-[#FFFBDE] h-[40vh] ">
				<div className="absolute inset-0 z-0">
					<HeroCarousel />
				</div>
				<div className="absolute inset-0 z-0 bg-[rgba(12,153,144,0.5)]"></div>
				<div className="relative z-20 h-full flex flex-col items-center justify-center text-center">
					<div className="container px-6 mx-auto">
						<h1 className="text-4xl md:text-6xl font-bold mb-4">
							Intentional Parenting for a Value-Driven Child
						</h1>
						<p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
							Nurture morally grounded, resilient, and successful
							children with the VDC Toolkit.
						</p>
						<a
							href="#toolkit"
							onClick={e => {
								e.preventDefault();
								navigate("/toolkit");
								window.scrollTo(0, 0);
							}}
							className="bg-[#129990] hover:bg-[#0d7a73] text-[#FFFBDE] inline-block font-bold py-3 px-8 text-lg rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
							Discover the Toolkit
						</a>
					</div>
				</div>
			</section>

			{/* Features Section - Dark Teal */}
			<section className="bg-[#096B68] text-[#FFFBDE] py-20">
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">
							Your Companion for Effective Parenting
						</h2>
						<p className="mt-4 max-w-2xl mx-auto">
							The Value Driven Child (VDC) parenting Toolkit is
							your essential companion for intentional and
							effective parenting. It is meticulously designed to
							equip parents and caregivers with proven methods to
							nurture morally grounded, resilient, and successful
							children in today's ever-changing world.
						</p>
					</div>

					<div className="grid md:grid-cols-4 gap-8 text-center">
						{features.map((item, index) => (
							<div
								key={index}
								className="p-6 bg-[#0d7a73] hover:bg-[#0e8a82] rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
								<h3 className="text-xl font-bold mb-2">
									{item.title}
								</h3>
								<p>{item.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Personality Types Section - Medium Teal */}
			<section className="bg-[#129990] text-[#FFFBDE] py-20">
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold mb-4">
							Understand Your Child's Unique Design
						</h2>
						<p className="text-lg max-w-2xl mx-auto">
							The VDC Toolkit helps you discover your child's
							natural predispositions—Gold, Blue, Green, or
							Orange—allowing for personalized parenting that
							nurtures their individual strengths.
						</p>
					</div>

					<div className="flex justify-center flex-wrap gap-4">
						{[
							{
								name: "Gold",
								color: "yellow-400/90",
								text: "gray-900",
							},
							{
								name: "Blue",
								color: "blue-400/90",
								text: "white",
							},
							{
								name: "Green",
								color: "green-400/90",
								text: "white",
							},
							{
								name: "Orange",
								color: "orange-400/90",
								text: "white",
							},
						].map((type, index) => (
							<span
								key={index}
								className={`bg-${type.color} text-${type.text} px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-transform hover:shadow-lg`}>
								{type.name}
							</span>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};
