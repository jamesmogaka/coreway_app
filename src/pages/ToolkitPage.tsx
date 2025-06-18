import React, { useState } from "react";
import { PrinciplesPage } from "./PrinciplesPage";
import { motion, type Variants } from "framer-motion";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../components/ui/hover-card";
import { kit1Data, kit2Data } from "../data/toolkitData";
import { AnimatedSection } from "../components/AnimatedSection";

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

// Animation Variants
const staggerContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			when: "beforeChildren",
		},
	},
};

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

// Sub-components
const ValueList: React.FC<{ data: ValueData }> = ({ data }) => (
	<div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-center">
		{Object.entries(data).map(([name, valueData]: [string, Value]) => (
			<HoverCard key={name}>
				<HoverCardTrigger asChild>
					<div className="p-4 text-lg font-semibold rounded-md cursor-pointer bg-teal-800 hover:bg-teal-700 transition-colors">
						{name}
					</div>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 bg-teal-700 text-white border-none">
					<p className="text-base mb-2">{valueData.description}</p>
					<div className="mt-2">
						<h4 className="text-base font-semibold">
							Why it's important:
						</h4>
						<p className="text-sm mb-2">{valueData.importance}</p>
						<h4 className="text-base font-semibold">
							What it looks like when lacking:
						</h4>
						<p className="text-sm">{valueData.lacking}</p>
					</div>
				</HoverCardContent>
			</HoverCard>
		))}
	</div>
);

const Card: React.FC<CardProps> = ({ color, children, active, onClick }) => {
	const styles = colorStyles[color];
	return (
		<motion.div
			className={`p-6 ${
				styles.bg
			} rounded-t-lg shadow-md cursor-pointer ${
				active === color ? "active-card" : ""
			}`}
			onClick={() => onClick(color)}
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

	const handleCardClick = (color: ColorKey) => {
		setActive(color);
	};

	return (
		<div className="fade-in" id="toolkit">
			{/* Toolkit Section */}
			<AnimatedSection className="py-20 bg-teal-600 text-yellow-50">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
						The VDC Train-up Toolkit
					</h1>
					<p className="text-lg md:text-xl text-center max-w-4xl mx-auto mb-16">
						The VDC Train-up Toolkit comprises two distinct
						age-specific kits, each meticulously tailored to cater
						to specific developmental stages. This ensures that
						character education is relevant, engaging, and impactful
						throughout a child’s growth.
					</p>
					<motion.div
						className="grid lg:grid-cols-2 gap-12"
						variants={staggerContainerVariants}>
						<motion.div
							className="bg-teal-700 p-8 rounded-lg shadow-lg"
							variants={staggerItemVariants}>
							<h2 className="text-3xl font-bold text-white mb-4">
								Kit 1: Early Development (4-9 Years)
							</h2>
							<p className="text-base md:text-lg mb-6">
								This kit focuses on 12 core values that form the
								basis of moral and ethical growth during early
								childhood.
							</p>
							<ValueList data={kit1Data} />
						</motion.div>
						<motion.div
							className="bg-teal-700 p-8 rounded-lg shadow-lg"
							variants={staggerItemVariants}>
							<h2 className="text-3xl font-bold text-white mb-4">
								Kit 2: Transitional Core Values (10-18 Years)
							</h2>
							<p className="text-base md:text-lg mb-6">
								This kit focuses on 12 essential values that
								support the complex transition from childhood
								into young adulthood.
							</p>
							<ValueList data={kit2Data} />
						</motion.div>
					</motion.div>
				</div>
			</AnimatedSection>

			{/* Principles Section */}
			<AnimatedSection>
				<PrinciplesPage />
			</AnimatedSection>

			{/* Predispositions Section */}
			<AnimatedSection className="py-20 bg-gray-800 text-yellow-50">
				<div className="container mx-auto px-6">
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
									variants={staggerItemVariants}>
									<Card
										color={key}
										active={active}
										onClick={handleCardClick}>
										{
											predispositions[key].header.split(
												":"
											)[0]
										}
									</Card>
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
