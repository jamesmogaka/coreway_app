import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import { HashLink } from "react-router-hash-link";
import { HeroSection } from "@/components/Hero";

const features = [
	{
		icon: "✅",
		title: "Affirm",
		description:
			"Start by affirming the value you want to nurture — Use Affirmation Cards to speak life, truth, and purpose into your child. Affirmation builds identity and opens the heart to receive training.",
	},
	{
		icon: "📘",
		title: "Train",
		description:
			"Use our daily Train-Up Cards, stories, and devotionals to teach what the value looks like in real life.\n\n Children don’t grow by lecture, but by daily habits, conversations, and small wins.\n\nEach value is broken down into age-appropriate practices, rooted in Scripture and real-life situations.",
	},
	{
		icon: "📊",
		title: "Track",
		description: `Use our visual charts and reflection tools to help your child track their growth.\n\nWhen children see their progress, they feel motivated and engaged.\nThis creates consistency, builds self-awareness, and opens doors for parent-child connection.`,
	},
	{
		icon: "🎉",
		title: "Reward",
		description: `Use our visual charts and reflection tools to help your child track their growth.\n\nWhen children see their progress, they feel motivated and engaged.\nThis creates consistency, builds self-awareness, and opens doors for parent-child connection.`,
	},
];

const predisposition = [
	{
		name: "Gold",
		className: "bg-yellow-400/90 text-gray-900",
	},
	{
		name: "Blue",
		className: "bg-blue-400/90 text-white",
	},
	{
		name: "Green",
		className: "bg-green-400/90 text-white",
	},
	{
		name: "Orange",
		className: "bg-orange-400/90 text-white",
	},
];

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
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export const HomePage: React.FC = () => {
	return (
		<section id="home">
			<style>{`
				body {
					overflow-x: hidden;
				}
			`}</style>
			<div className="min-h-screen">
				<HeroSection />

				<AnimatedSection className="text-yellow-50 py-20">
					<div className="container mx-auto px-6">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								We don’t just train behavior — we shape hearts.
							</h2>
							<p className="mt-6 text-lg max-w-2xl mx-auto">
								CorePath Impact exists to restore the foundation
								of society by equipping parents to raise
								children of conviction, compassion, and calling
								through:
							</p>
						</div>

						<div className="grid md:grid-cols-3 gap-10 mb-16">
							<div className="bg-white/10 backdrop-blur-lg border-2 border-yellow-400/40 rounded-xl shadow-lg p-8 text-center">
								<div className="flex flex-col items-center mb-6">
									<span className="text-4xl md:text-5xl text-yellow-300 mb-2">
										💡
									</span>
									<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 text-yellow-200 ">
										Why CorePath Impact?
									</h3>
								</div>
								<ul className="text-base md:text-lg mb-2 text-left mx-auto max-w-xs md:max-w-sm list-none space-y-2">
									<li className="flex items-center gap-2">
										<span className="text-yellow-300">
											🌍
										</span>
										<span>International reach</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-yellow-300">
											🧭
										</span>
										<span>
											Deliberate, guided parenting systems
										</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-yellow-300">
											📘
										</span>
										<span>
											Structured, age-appropriate tools
										</span>
									</li>
									<li className="flex items-center gap-2">
										<span className="text-yellow-300">
											💛
										</span>
										<span>
											Value-based, spiritually grounded
											content
										</span>
									</li>
								</ul>
							</div>
							<div className="bg-white/10 backdrop-blur-lg border-2 border-yellow-400/40 rounded-xl shadow-lg p-8 text-center">
								<div className="flex flex-col items-center mb-4">
									<span className="text-4xl md:text-5xl text-yellow-300 mb-2">
										⚠️
									</span>
									<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 text-yellow-200 drop-shadow">
										The Challenge
									</h3>
								</div>
								<p className="mb-6 text-base md:text-lg text-yellow-100 leading-relaxed font-medium">
									Modern parenting is overwhelmed by{" "}
									<span className="font-semibold text-yellow-300">
										noise, distraction, and confusion
									</span>{" "}
									— often without clear, lasting anchors.
									<br className="hidden md:block" />
									<span className="block mt-2">
										We solve this by bringing{" "}
										<span className="font-semibold text-yellow-300">
											clarity, structure, and spiritual
											grounding
										</span>{" "}
										through tools that help parents:
									</span>
								</p>
								<ul className="text-base md:text-lg mb-2 text-left mx-auto max-w-xs md:max-w-sm list-none">
									<li className="flex items-center mb-1">
										<span className="text-yellow-300 mr-2">
											•
										</span>
										<span>Be intentional</span>
									</li>
									<li className="flex items-center mb-1">
										<span className="text-yellow-300 mr-2">
											•
										</span>
										<span>Be value-focused</span>
									</li>
									<li className="flex items-center">
										<span className="text-yellow-300 mr-2">
											•
										</span>
										<span>
											Raise purpose-driven children
										</span>
									</li>
								</ul>
							</div>
							<div className="bg-white/10 backdrop-blur-lg border-2 border-yellow-400/40 rounded-xl shadow-lg p-8 text-center">
								<div className="flex flex-col items-center mb-4">
									<span className="text-4xl md:text-5xl text-yellow-300 mb-2">
										🛠️
									</span>
									<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-1 text-yellow-200">
										Our Flagship: VDC Toolkit
									</h3>
								</div>
								<ul className="text-base md:text-lg mb-2 text-left mx-auto max-w-xs md:max-w-sm list-none">
									<li className="flex items-center mb-1">
										<span className="text-yellow-300 mr-2">
											✳️
										</span>
										<span>
											Train-Up Cards for daily habits
										</span>
									</li>
									<li className="flex items-center mb-1">
										<span className="text-yellow-300 mr-2">
											📖
										</span>
										<span>Corrective & Reward Cards</span>
									</li>
									<li className="flex items-center mb-1">
										<span className="text-yellow-300 mr-2">
											🎯
										</span>
										<span>Reflection & Reward Charts</span>
									</li>
									<li className="flex items-center">
										<span className="text-yellow-300 mr-2">
											👨‍👩‍👧‍👦
										</span>
										<span>
											Parenting Guides by predisposition
										</span>
									</li>
								</ul>
								<p className="mt-4 text-base md:text-lg text-yellow-100 leading-relaxed font-medium">
									Instill 24 timeless values in children ages
									4–18 with our simple, effective four-step
									method:{" "}
									<b>Affirm – Train – Track – Reward</b>.
								</p>
							</div>
						</div>

						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold mb-4">
								Our Parenting Method: Affirm – Train – Track –
								Reward
							</h2>
							<p className="mt-6 text-lg max-w-2xl mx-auto">
								At the heart of the VDC Toolkit is a simple,
								powerful four-step system that makes value-based
								parenting consistent, practical, and effective:
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
									className="p-8 bg-white/10 backdrop-blur-lg border-2 border-yellow-400/40 rounded-2xl shadow-xl flex flex-col items-center transition-all duration-300 hover:shadow-2xl hover:border-yellow-300"
									variants={itemVariants}
									whileHover={{ y: -8 }}>
									<span className="text-5xl mb-4 text-yellow-300 drop-shadow-sm">
										{item.icon}
									</span>
									<h3 className="text-2xl md:text-2xl font-extrabold tracking-tight mb-2 text-yellow-100">
										{item.title}
									</h3>
									<p className="text-base md:text-lg text-yellow-50 leading-relaxed text-center">
										{item.description}
									</p>
								</motion.div>
							))}
						</motion.div>
					</div>
				</AnimatedSection>

				{/* Personality Types Section - Medium Teal */}
				<AnimatedSection className="text-yellow-50 py-20">
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
								<motion.div
									key={index}
									variants={itemVariants}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}>
									<HashLink
										to={`/#predispositions`}
										className={`${type.className} px-4 py-2 rounded-full font-semibold shadow-md transition-transform hover:shadow-lg`}>
										{type.name}
									</HashLink>
								</motion.div>
							))}
						</motion.div>
					</div>
				</AnimatedSection>
			</div>
		</section>
	);
};
