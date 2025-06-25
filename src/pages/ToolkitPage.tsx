import React, { useState, useCallback } from "react";
import { PrinciplesPage } from "./PrinciplesPage";
import { motion, type Variants } from "framer-motion";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../components/ui/hover-card";
import { kit1Data, kit2Data } from "../data/toolkitData";
import { AnimatedSection } from "../components/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { HashLink } from "react-router-hash-link";
import { CheckCircle, Download, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Type Definitions
interface Value {
	description: string;
	importance: string;
	lacking: string;
}

interface ValueData {
	[key: string]: Value;
}

type ColorKey = "blue" | "orange" | "gold" | "green";

interface Predisposition {
	header: string;
	description: string;
	parenting: string;
}

interface Predispositions {
	[key: string]: Predisposition;
}

interface CardProps {
	color: ColorKey;
	children: React.ReactNode;
	active: ColorKey;
	onClick: (color: ColorKey) => void;
}

interface DescriptionProps {
	color: ColorKey;
	data: Predisposition;
	active: ColorKey;
}

const staggerItemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

// Data for Predispositions
const predispositions: Predispositions = {
	blue: {
		header: "The Blue Predisposition: The Relationship-Builder",
		description:
			"Blues are motivated by connection, harmony, and purpose. They are empathetic, communicative, and seek to create meaningful relationships.",
		parenting:
			"Nurture their need for security and belonging. Use one-on-one time, affirm their feelings, and provide a stable, loving environment.",
	},
	orange: {
		header: "The Orange Predisposition: The Action-Taker",
		description:
			"Oranges are energetic, spontaneous, and results-oriented. They thrive on freedom, variety, and hands-on experiences.",
		parenting:
			"Provide opportunities for adventure and independence. Keep things fun and engaging, and allow them to learn by doing.",
	},
	gold: {
		header: "The Gold Predisposition: The Organizer",
		description:
			"Golds are responsible, organized, and detail-oriented. They value tradition, structure, and a sense of duty.",
		parenting:
			"Offer clear expectations, consistent routines, and praise for their hard work and reliability. Respect their need for order.",
	},
	green: {
		header: "The Green Predisposition: The Thinker",
		description:
			"Greens are analytical, innovative, and logical. They are driven by a thirst for knowledge, competence, and understanding.",
		parenting:
			"Encourage their curiosity and respect their need for intellectual space. Engage in deep conversations and value their logical reasoning.",
	},
};

// Color Styles
const colorStyles = {
	blue: {
		bg: "bg-blue-500",
		text: "text-white",
		descriptionText: "text-blue-600",
	},
	orange: {
		bg: "bg-orange-500",
		text: "text-white",
		descriptionText: "text-orange-600",
	},
	gold: {
		bg: "bg-yellow-500",
		text: "text-white",
		descriptionText: "text-yellow-600",
	},
	green: {
		bg: "bg-green-500",
		text: "text-white",
		descriptionText: "text-green-600",
	},
};
//
//
const whyVDC = [
	"Personalized – Built around each child’s unique God-given design (using the Color Predisposition Quiz).",
	"Proactive – Focused on instilling values before problems arise, not after.",
	"Purposeful – Anchored in six timeless principles of spiritual, emotional, and behavioral growth.",
	"Structured – Uses the ATTR Cycle: Affirm – Train – Track – Reward to guide your daily parenting rhythm.",
	"Scripture-rooted – Every value is reinforced through Bible truths, not just feel-good sayings.",
];
// Sub-components
const ValueList: React.FC<{ data: ValueData }> = ({ data }) => (
	<div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center">
		{Object.entries(data).map(([name, valueData]: [string, Value]) => (
			<HoverCard key={name}>
				<HoverCardTrigger asChild>
					<div className="p-4 text-lg font-semibold rounded-md cursor-pointer bg-white/20 hover:bg-white/30 border border-white/30 backdrop-blur-md shadow-lg transition-colors">
						{name}
					</div>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 bg-white/30 text-gray-900 border border-white/30 backdrop-blur-md shadow-xl text-lg">
					<p className="text-lg mb-2">{valueData.description}</p>
					<div className="mt-2">
						<h4 className="text-base font-semibold">
							Why it's important:
						</h4>
						<p className="text-base mb-2">{valueData.importance}</p>
						<h4 className="text-base font-semibold">
							What it looks like when lacking:
						</h4>
						<p className="text-base">{valueData.lacking}</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		))}
	</div>
);

const PredispositionCard: React.FC<CardProps> = ({
	color,
	children,
	active,
	onClick,
}) => {
	const styles = colorStyles[color];
	const handleClick = useCallback(() => {
		onClick(color);
	}, [color, onClick]);

	return (
		<motion.div
			className={`p-6 ${
				styles.bg
			} rounded-t-lg shadow-md cursor-pointer ${
				active === color ? "active-card" : ""
			}`}
			onClick={handleClick}
			whileHover={{ scale: 1.03, y: -5 }}
			whileTap={{ scale: 0.98 }}
			transition={{ duration: 0.2 }}>
			<h3
				className={`text-xl md:text-2xl font-bold ${styles.text} text-center`}>
				{children}
			</h3>
		</motion.div>
	);
};

const Description: React.FC<DescriptionProps> = ({ color, data, active }) => {
	const styles = colorStyles[color];
	return (
		<div
			className={`description-panel bg-white p-6 rounded-b-lg shadow-lg ${
				active === color ? "show" : ""
			}`}>
			<div className="description-content fade-in">
				<h2
					className={`text-2xl md:text-3xl font-bold ${styles.descriptionText} mb-4`}>
					{data.header}
				</h2>
				<p className="text-gray-700 mb-4 text-base md:text-lg">
					{data.description}
				</p>
				<p
					className="text-gray-700 text-base md:text-lg"
					dangerouslySetInnerHTML={{
						__html: `<strong>Parenting Style:</strong> ${data.parenting}`,
					}}
				/>
			</div>
		</div>
	);
};

// Main Component
export const ToolkitPage: React.FC = () => {
	const [active, setActive] = useState<ColorKey>("blue");

	const handleCardClick = useCallback((color: ColorKey) => {
		setActive(color);
	}, []);

	return (
		<div className="fade-in" id="toolkit">
			{/* Toolkit Section */}
			<AnimatedSection className="py-20 text-yellow-50">
				<motion.div
					className="container mx-auto px-6"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: "easeOut" }}>
					<motion.div
						className="flex justify-center mt-8"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.5 }}>
						<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4">
							VGC Train-up Toolkit
						</Badge>
					</motion.div>
					<motion.h2
						className="text-4xl md:text-5xl font-bold text-center mb-12 text-yellow-50"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.15, duration: 0.6 }}>
						The VDC Train-up Toolkit
					</motion.h2>
					<motion.p
						className="text-lg md:text-xl text-center max-w-4xl mx-auto mb-16 text-yellow-50"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.6 }}>
						The VDC Train-up Toolkit comprises two distinct
						age-specific kits, each meticulously tailored to cater
						to specific developmental stages. This ensures that
						character education is relevant, engaging, and impactful
						throughout a child’s growth.
					</motion.p>
					<motion.div
						className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						variants={{
							hidden: {},
							visible: {
								transition: {
									staggerChildren: 0.18,
								},
							},
						}}>
						<motion.div
							className="space-y-4 lg:space-y-16"
							initial="hidden"
							animate="visible"
							variants={{
								hidden: {},
								visible: {
									transition: { staggerChildren: 0.1 },
								},
							}}>
							<motion.div
								className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 p-8 rounded-lg shadow-lg"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.25, duration: 0.6 }}>
								<h2 className="text-3xl font-bold text-white mb-4">
									Kit 1: Early Development (4-9 Years)
								</h2>
								<p className="text-base md:text-lg mb-6 text-yellow-50">
									This kit focuses on 12 core values that form
									the basis of moral and ethical growth during
									early childhood.
								</p>
								<ValueList data={kit1Data} />
							</motion.div>
							<motion.div
								className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-500 p-8 rounded-lg shadow-lg"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.35, duration: 0.6 }}>
								<h2 className="text-3xl font-bold text-white mb-4">
									Kit 2: Transitional Core Values (10-18
									Years)
								</h2>
								<p className="text-base md:text-lg mb-6 text-yellow-50">
									This kit focuses on 12 essential values that
									support the complex transition from
									childhood into young adulthood.
								</p>
								<ValueList data={kit2Data} />
							</motion.div>
							<motion.div
								className="flex justify-center mt-6"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.45, duration: 0.5 }}>
								<HashLink to="/vdc-parenting#" smooth>
									<Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg shadow-lg">
										Learn More About VDC Parenting
									</Button>
								</HashLink>
							</motion.div>
						</motion.div>
						<motion.div
							className="space-y-6"
							initial="hidden"
							animate="visible"
							variants={{
								hidden: {},
								visible: {
									transition: { staggerChildren: 0.1 },
								},
							}}>
							<motion.img
								src="/images/1.png"
								alt="VGC Toolkit materials"
								width={400}
								height={300}
								className="rounded-xl shadow-lg w-full"
								initial={{ opacity: 0, scale: 0.95 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.55, duration: 0.6 }}
							/>
							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.65, duration: 0.6 }}>
								<Card className="bg-blue-50 border-blue-200">
									<CardHeader>
										<CardTitle className="text-blue-900">
											Why the VGC Toolkit Works:
										</CardTitle>
									</CardHeader>
									<CardContent className="space-y-3">
										{whyVDC.map((item, index) => (
											<div
												key={index}
												className="flex items-center space-x-3">
												<CheckCircle className="h-5 w-5 text-blue-600" />
												<span className="text-blue-800">
													{item}
												</span>
											</div>
										))}
									</CardContent>
								</Card>
							</motion.div>
							<motion.div
								className="flex flex-col sm:flex-row flex-wrap gap-3"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.7, duration: 0.5 }}>
								<HashLink to="/sample-toolkit#" smooth>
									<Button variant="outline">
										<Download className="h-4 w-4 mr-2" />
										Sample Toolkit
									</Button>
								</HashLink>
								<HashLink to="/demo#" smooth>
									<Button variant="outline">Free Demo</Button>
								</HashLink>
								<HashLink to="/shop#shop" smooth>
									<Button className="bg-orange-600 hover:bg-orange-700">
										<ShoppingCart className="h-4 w-4 mr-2" />
										Buy Toolkit
									</Button>
								</HashLink>
							</motion.div>
						</motion.div>
					</motion.div>
				</motion.div>
			</AnimatedSection>

			{/* Principles Section */}
			<AnimatedSection>
				<PrinciplesPage />
			</AnimatedSection>

			{/* Predispositions Section */}
			<AnimatedSection className="py-20 text-yellow-50">
				<div className="container mx-auto px-6" id="predispositions">
					<h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
						The Four-Color Predispositions
					</h1>
					<div className="w-24 h-1 bg-yellow-50 mx-auto mb-8"></div>
					<p className="text-lg md:text-xl text-center max-w-4xl mx-auto mb-16">
						Understanding your child's natural disposition is key to
						effective parenting. Our toolkit helps you identify
						whether your child is Blue, Orange, Gold, or Green, so
						you can tailor your approach to their unique needs.
					</p>
					<div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
						{(Object.keys(predispositions) as ColorKey[]).map(
							key => (
								<motion.div
									key={key}
									id={key}
									variants={staggerItemVariants}>
									<PredispositionCard
										color={key}
										active={active}
										onClick={handleCardClick}>
										{
											predispositions[key].header.split(
												":"
											)[0]
										}
									</PredispositionCard>
									<Description
										color={key}
										data={predispositions[key]}
										active={active}
									/>
								</motion.div>
							)
						)}
					</div>
				</div>
			</AnimatedSection>
		</div>
	);
};
