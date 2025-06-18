import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	type Value,
	type ValueData,
	kit1Data,
	kit2Data,
} from "../data/toolkitData";

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

const staggerContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const staggerItemVariants: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.8, ease: "easeOut" },
	},
};

const colorStyles = {
	blue: {
		bg: "bg-blue-400/90",
		text: "text-white",
		descriptionText: "text-blue-800",
	},
	orange: {
		bg: "bg-orange-400/90",
		text: "text-white",
		descriptionText: "text-orange-800",
	},
	gold: {
		bg: "bg-yellow-400/90",
		text: "text-gray-900",
		descriptionText: "text-yellow-800",
	},
	green: {
		bg: "bg-green-400/90",
		text: "text-white",
		descriptionText: "text-green-800",
	},
};

type ColorKey = keyof typeof colorStyles;

// From PredispositionsPage.tsx
interface DescriptionProps {
	color: ColorKey;
	data: Predisposition;
	active: ColorKey;
}

interface CardProps {
	color: ColorKey;
	children: React.ReactNode;
	active: ColorKey;
	onClick: (color: ColorKey) => void;
}

export interface Predisposition {
	title: string;
	header: string;
	description: string;
	parenting: string;
}

type Predispositions = {
	[key: string]: Predisposition;
};

const predispositions: Predispositions = {
	blue: {
		title: "The Blue Child",
		header: "Empathetic & Harmonious",
		description:
			"Driven by relationships and harmony, Blue children are compassionate, nurturing, and deeply relationship-oriented. They are the heart of the home, prioritizing emotional connection and peace.",
		parenting:
			"Be a <strong>Nurturing Guide</strong>. Focus on emotional security, empathy, and relationship-building with a compassionate and supportive style.",
	},
	orange: {
		title: "The Orange Child",
		header: "Action-Oriented & Spontaneous",
		description:
			"Driven by action and freedom, Orange children are energetic, creative, and love to explore. They bring enthusiasm and a love for adventure to every situation.",
		parenting:
			"Be an <strong>Adventurous Coach</strong>. Focus on freedom, spontaneity, and hands-on learning with an energetic and motivational style.",
	},
	gold: {
		title: "The Gold Child",
		header: "Structured & Responsible",
		description:
			"Driven by structure and duty, Gold children are organized, dependable, and detail-oriented. They are the steady anchors who thrive on clear expectations and routine.",
		parenting:
			"Be a <strong>Structured Guide</strong>. Focus on discipline, responsibility, and stability with a consistent, rule-based style.",
	},
	green: {
		title: "The Green Child",
		header: "Analytical & Independent",
		description:
			"Driven by understanding and logic, Green children are independent thinkers who are curious and enjoy problem-solving. They seek knowledge and truth.",
		parenting:
			"Be an <strong>Analytical Mentor</strong>. Focus on intellectual stimulation, independence, and logical reasoning with a knowledge-driven style.",
	},
};

const Card: React.FC<CardProps> = ({ color, children, active, onClick }) => {
	const styles = colorStyles[color];
	return (
		<div
			className={`p-6 ${
				styles.bg
			} rounded-t-lg shadow-md predisposition-card ${
				active === color ? "active-card" : ""
			}`}
			onClick={() => onClick(color)}>
			<h3
				className={`text-xl md:text-2xl font-bold ${styles.text} text-center`}>
				{children}
			</h3>
		</div>
	);
};

const Description: React.FC<DescriptionProps> = ({ color, data, active }) => {
	const styles = colorStyles[color];
	return (
		<div
			className={`description-panel text-base md:text-lg ${
				active === color ? "show" : ""
			}`}>
			<div className="description-content fade-in">
				<h2
					className={`text-3xl md:text-4xl font-bold ${styles.descriptionText} mb-4`}>
					{data.header}
				</h2>
				<p className="text-gray-700 mb-4">{data.description}</p>
				<p
					dangerouslySetInnerHTML={{
						__html: `<strong>Parenting Style:</strong> ${data.parenting}`,
					}}
				/>
			</div>
		</div>
	);
};

// Original ToolkitPage content
const ValueList: React.FC<{
	data: ValueData;
}> = ({ data }) => (
	<div className="grid grid-cols-3 gap-2 text-center">
		{Object.entries(data).map(([name, valueData]: [string, Value]) => (
			<HoverCard key={name}>
				<HoverCardTrigger asChild>
					<div className="p-4 text-lg md:text-xl font-semibold rounded-md cursor-pointer hover:bg-teal-700 transition-colors">
						{name}
					</div>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 bg-teal-700 text-white border-none">
					<p className="text-base mb-2">{valueData.description}</p>
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

export const ToolkitPage: React.FC = () => {
	// State from PredispositionsPage
	const [active, setActive] = useState<ColorKey>("blue");

	const handleCardClick = (color: ColorKey) => {
		setActive(color);
	};

	return (
		<div className="fade-in" id="toolkit">
			{/* Toolkit Section */}
			<section className="py-20 bg-teal-600 text-yellow-50">
				<div className="container mx-auto px-6">
					<motion.h1
						className="text-4xl md:text-5xl font-bold text-center mb-12"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={sectionVariants}>
						The VDC Train-up Toolkit
					</motion.h1>
					<motion.p
						className="text-lg md:text-xl text-center max-w-7xl mx-auto mb-16"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={sectionVariants}>
						The VDC Train-up Toolkit comprises two distinct
						age-specific kits, each meticulously tailored to cater
						to specific developmental stages. This ensures that
						character education is relevant, engaging, and impactful
						throughout a child’s growth.
					</motion.p>
					<motion.div
						className="grid lg:grid-cols-2 gap-12"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainerVariants}>
						<motion.div
							className="bg-teal-700 p-8 rounded-lg shadow-lg"
							variants={staggerItemVariants}>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
								Kit 1: Early Development (4-9 Years)
							</h2>
							<p className="text-base md:text-lg mb-6">
								This kit focuses on 12 core values that form the
								basis of moral and ethical growth during early
								childhood. Click on a value to learn more.
							</p>
							<ValueList data={kit1Data} />
						</motion.div>
						<motion.div
							className="bg-teal-700 p-8 rounded-lg shadow-lg"
							variants={staggerItemVariants}>
							<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
								Kit 2: Transitional Core Values (10-18 Years)
							</h2>
							<p className="text-base md:text-lg mb-6">
								This kit focuses on 12 essential values that
								support the complex transition from childhood
								into young adulthood. Click on a value to learn
								more.
							</p>
							<ValueList data={kit2Data} />
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* PrinciplesPage content */}
			<section className="py-20 bg-teal-900 text-yellow-50">
				<div className="container mx-auto px-6">
					<motion.h1
						className="text-4xl md:text-5xl font-bold text-center mb-12"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={sectionVariants}>
						Toolkit Guiding Principles: The Foundation of VDC
						Parenting
					</motion.h1>
					<motion.p
						className="text-lg md:text-xl text-center max-w-7xl mx-auto mb-16"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={sectionVariants}>
						At the heart of the Value Driven Child (VDC) Toolkit
						lies a robust framework built upon six interconnected
						guiding principles. These principles are carefully
						chosen and meticulously integrated, drawing from sound
						educational, psychological, and neurological theories,
						to provide parents with a clear, structured, and
						adaptable roadmap for raising children of strong
						character and conviction. Together, these principles
						transform parenting from reactive behavior management
						into a sacred, intentional journey—one that raises
						children of deep character, strong identity, and
						unshakable faith.
					</motion.p>
					<motion.div
						className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={staggerContainerVariants}>
						<motion.div
							className="p-6 bg-teal-700 rounded-lg shadow-md"
							variants={staggerItemVariants}>
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								1. Foundational Core Values
							</h3>
							<p className="text-base md:text-lg">
								Values are not isolated; they are intrinsically
								linked and interconnected, like roots, branches,
								and fruits. A touch on one value naturally
								touches others. Some values are more
								"foundational" than others because, when
								cultivated, they naturally lead to the
								development of many other positive virtues and
								behaviors (what we call "resultant values and
								behaviors") compared to others. Why it matters
								to you: It's practically impossible to
								intentionally teach a child over 200 different
								values one by one. This principle helps us focus
								on a carefully selected set of just 24
								foundational core values. By concentrating on
								these high-impact values, your child will
								naturally develop over 200 additional values and
								behaviors without your active involvement,
								resonating with the efficient Pareto's Rule
								(80/20 principle). These values are
								strategically divided into age-appropriate sets
								of 12 for early childhood (4-9 years) and 12 for
								adolescence (10-18 years).
							</p>
						</motion.div>
						<motion.div
							className="p-6 bg-teal-700 rounded-lg shadow-md"
							variants={staggerItemVariants}>
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								2. Natural Exclusive Predispositions
							</h3>
							<p className="text-base md:text-lg">
								Every child is uniquely wired and is born with a
								divine imprint—a unique purpose and innate
								design. This includes their natural
								predispositions, which are inherent traits
								shaping their personality, learning style,
								emotional responses, and overall behavior. These
								aren't random; they are part of God's purposeful
								design meant to align each child to their divine
								purpose and calling. Why it matters to you: This
								principle moves beyond the "one-size-fits-all"
								myth of traditional parenting. Trying to mold a
								child against their natural bent can lead to
								frustration, disengagement, low self-esteem,
								anxiety, and even behavioral problems, as their
								authentic self feels suppressed. The VDC Toolkit
								includes a Color Predisposition Quiz to help you
								identify your child's unique type (Blue, Orange,
								Gold, Green). This allows you to adopt
								"Exclusive Parenting"—a tailored approach that
								aligns with your child's inherent traits,
								fostering their unique strengths and authentic
								growth- the God-given design.
							</p>
						</motion.div>
						<motion.div
							className="p-6 bg-teal-700 rounded-lg shadow-md"
							variants={staggerItemVariants}>
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								3. The Principle of Affirmation
							</h3>
							<p className="text-base md:text-lg">
								This principle highlights the profound power of
								positive statements to shape a child's mindset,
								reinforce self-belief, and realign their
								identity with truth, especially when grounded in
								biblical principles. It's supported by
								neuroscience (neuroplasticity) and psychology
								(self-suggestion, cognitive bias), showing how
								consistent positive declarations strengthen
								neural pathways. Why it matters to you: The VDC
								Toolkit uses specially designed Affirmation
								Cards rooted in biblical truths. These cards
								help your child internalize their identity as
								loved, purposed, and uniquely created by God. By
								regularly affirming their inherent worth,
								spiritual attributes, character, and purpose,
								you counter harmful comparisons and build
								confidence, self-acceptance, and a strong,
								values-based identity.
							</p>
						</motion.div>
						<motion.div
							className="p-6 bg-teal-700 rounded-lg shadow-md"
							variants={staggerItemVariants}>
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								4. The Principle of Storytelling
							</h3>
							<p className="text-base md:text-lg">
								Stories are a powerful, age-old tool for
								instilling values. They bypass intellectual
								defenses and connect directly with the heart,
								making abstract concepts like honesty or
								perseverance tangible and memorable. Supported
								by psychology (narrative psychology) and
								neurology (mirror neurons), stories create
								immersive experiences that allow children to
								internalize values emotionally and cognitively.
								Why it matters to you: The VDC Toolkit includes
								a collection of beautifully illustrated Story
								Cards. Each story is crafted to bring a specific
								value to life, featuring relatable characters
								and engaging plots. This makes learning about
								values an enjoyable and impactful experience,
								turning abstract principles into lasting
								convictions.
							</p>
						</motion.div>
						<motion.div
							className="p-6 bg-teal-700 rounded-lg shadow-md"
							variants={staggerItemVariants}>
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								5. The Principle of Active Engagement
							</h3>
							<p className="text-base md:text-lg">
								Children learn best by doing. Active engagement
								transforms passive listening into active
								learning, creating stronger neural connections
								and deeper understanding. This principle is
								rooted in educational theories like experiential
								learning and constructivism, which emphasize
								hands-on activities for meaningful learning. Why
								it matters to you: The VDC Toolkit is designed
								for interaction. It includes Discussion Cards
								with thought-provoking questions to spark
								meaningful conversations, connecting values to
								real-life situations. This active dialogue helps
								your child think critically, articulate their
								thoughts, and apply values to their own
								experiences, making character development a
								collaborative family activity.
							</p>
						</motion.div>
						<motion.div
							className="p-6 bg-teal-700 rounded-lg shadow-md"
							variants={staggerItemVariants}>
							<h3 className="text-2xl md:text-3xl font-bold mb-2">
								6. The Principle of Repetition and Routine
							</h3>
							<p className="text-base md:text-lg">
								Consistency is key to forming lasting habits and
								beliefs. Repetition strengthens neural pathways,
								making values-based thinking and behavior second
								nature. This principle is grounded in the
								brain's ability to learn through repeated
								exposure and practice. Why it matters to you:
								The VDC Toolkit is designed for easy integration
								into your daily life. By incorporating the
								toolkit's activities into your family
								routine—whether at bedtime, dinnertime, or
								during play—you create a consistent environment
								where values are regularly discussed, affirmed,
								and lived out. This transforms character
								development from a one-time lesson into a
								continuous, lifelong journey.
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Predispositions Section */}
			<section className="bg-teal-600 text-yellow-50 py-20 overflow-hidden">
				<div className="container mx-auto px-6">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						viewport={{ once: true, margin: "-100px" }}>
						<h1 className="text-4xl md:text-5xl font-bold text-yellow-50 text-center mb-6">
							The Four-Color Predispositions
						</h1>
						<div className="w-24 h-1 bg-yellow-50 mx-auto mb-8"></div>
					</motion.div>

					<motion.p
						className="text-lg md:text-xl text-center text-yellow-50 max-w-7xl mx-auto mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.2,
							ease: "easeOut",
						}}
						viewport={{ once: true, margin: "-100px" }}>
						Understanding your child's natural disposition is key to
						effective parenting. Our toolkit helps you identify
						whether your child is Blue, Orange, Gold, or Green, so
						you can tailor your approach to their unique needs.
					</motion.p>

					<motion.div
						className="grid md:grid-cols-2 gap-8"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={{
							hidden: { opacity: 0 },
							visible: {
								opacity: 1,
								transition: {
									staggerChildren: 0.1,
									when: "beforeChildren",
								},
							},
						}}>
						<motion.div
							id="blue"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										ease: "easeOut",
									},
								},
							}}>
							<Card
								color="blue"
								active={active}
								onClick={handleCardClick}>
								{predispositions.blue.title}
							</Card>
							<Description
								color="blue"
								data={predispositions.blue}
								active={active}
							/>
						</motion.div>
						<motion.div
							id="orange"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										ease: "easeOut",
									},
								},
							}}>
							<Card
								color="orange"
								active={active}
								onClick={handleCardClick}>
								{predispositions.orange.title}
							</Card>
							<Description
								color="orange"
								data={predispositions.orange}
								active={active}
							/>
						</motion.div>
						<motion.div
							id="gold"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										ease: "easeOut",
									},
								},
							}}>
							<Card
								color="gold"
								active={active}
								onClick={handleCardClick}>
								{predispositions.gold.title}
							</Card>
							<Description
								color="gold"
								data={predispositions.gold}
								active={active}
							/>
						</motion.div>
						<motion.div
							id="green"
							variants={{
								hidden: { opacity: 0, y: 20 },
								visible: {
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										ease: "easeOut",
									},
								},
							}}>
							<Card
								color="green"
								active={active}
								onClick={handleCardClick}>
								{predispositions.green.title}
							</Card>
							<Description
								color="green"
								data={predispositions.green}
								active={active}
							/>
						</motion.div>
					</motion.div>

					<motion.div
						className="text-center mt-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.6,
							delay: 0.4,
							ease: "easeOut",
						}}
						viewport={{ once: true, margin: "-50px" }}>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}>
							<a
								href="http://www.vdctoolkit.com/predisposition-quiz"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-block font-bold py-3 px-8 text-lg rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg bg-blue-600 text-white hover:bg-blue-700">
								Take the Predisposition Quiz
							</a>
						</motion.div>
					</motion.div>
				</div>
			</section>
		</div>
	);
};
