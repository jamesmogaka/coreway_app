import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { HeroCarousel } from "../components/HeroCarousel";
import { HashLink } from "react-router-hash-link";

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

const predisposition = [
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
];

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

export const HomePage: React.FC = () => {
	return (
		<div className="bg-teal-900 min-h-screen" id="home">
			{/* Hero Section - Dark Teal */}
			<section className="relative text-yellow-50 h-[40vh]">
				<div className="absolute inset-0 z-0">
					<HeroCarousel />
				</div>
				<div className="absolute inset-0 z-0 bg-teal-700/50"></div>
				<motion.div
					className="relative z-20 h-full flex flex-col items-center justify-center text-center"
					initial="hidden"
					animate="visible"
					variants={containerVariants}>
					<div className="container px-6 mx-auto">
						<motion.h1
							className="text-4xl md:text-5xl font-bold mb-6"
							variants={itemVariants}>
							Intentional Parenting for a Value-Driven Child
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
							variants={itemVariants}>
							Nurture morally grounded, resilient, and successful
							children with the VDC Toolkit.
						</motion.p>
						<motion.div variants={itemVariants}>
							<HashLink
								to="#toolkit"
								className="bg-teal-700 hover:bg-teal-400 text-yellow-50 inline-block font-bold py-4 px-10 text-xl rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-105">
								Discover the Toolkit
							</HashLink>
						</motion.div>
					</div>
				</motion.div>
			</section>

			{/* Features Section - Dark Teal */}
			<motion.section
				className="text-yellow-50 py-20"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={sectionVariants}>
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Your Companion for Effective Parenting
						</h2>
						<p className="mt-6 text-lg max-w-2xl mx-auto">
							The Value Driven Child (VDC) parenting Toolkit is
							your essential companion for intentional and
							effective parenting. It is meticulously designed to
							equip parents and caregivers with proven methods to
							nurture morally grounded, resilient, and successful
							children in today's ever-changing world.
						</p>
					</div>

					<motion.div
						className="grid md:grid-cols-4 gap-8 text-center"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}>
						{features.map((item, index) => (
							<motion.div
								key={index}
								className="p-6 bg-teal-700 hover:bg-teal-400 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
								variants={itemVariants}>
								<h3 className="text-2xl font-bold mb-4">
									{item.title}
								</h3>
								<p className="text-base md:text-xl">
									{item.description}
								</p>
							</motion.div>
						))}
					</motion.div>
				</div>
			</motion.section>

			{/* Personality Types Section - Medium Teal */}
			<motion.section
				className="bg-teal-600 text-yellow-50 py-20"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={sectionVariants}>
				<div className="container mx-auto px-6">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							Understand Your Child's Unique Design
						</h2>
						<p className="text-lg max-w-2xl mx-auto">
							The VDC Toolkit helps you discover your child's
							natural predispositions—Gold, Blue, Green, or
							Orange—allowing for personalized parenting that
							nurtures their individual strengths.
						</p>
					</div>

					<motion.div
						className="flex justify-center flex-wrap gap-4"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}>
						{predisposition.map((type, index) => (
							<motion.div key={index} variants={itemVariants}>
								<HashLink
									to={`/#${type.name.toLowerCase()}`}
									className={`bg-${type.color} text-${type.text} px-4 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition-transform hover:shadow-lg`}>
									{type.name}
								</HashLink>
							</motion.div>
						))}
					</motion.div>
				</div>
			</motion.section>
		</div>
	);
};
