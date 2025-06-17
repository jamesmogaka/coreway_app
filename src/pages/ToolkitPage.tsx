import React, { useState } from "react";
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
			<h3 className={`text-3xl font-bold ${styles.text} text-center`}>
				{children}
			</h3>
		</div>
	);
};

const Description: React.FC<DescriptionProps> = ({ color, data, active }) => {
	const styles = colorStyles[color];
	return (
		<div className={`description-panel ${active === color ? "show" : ""}`}>
			<div className="description-content fade-in">
				<h2
					className={`text-4xl font-bold ${styles.descriptionText} mb-4`}>
					{data.header}
				</h2>
				<p className="text-base md:text-2xl text-gray-700 mb-4">
					{data.description}
				</p>
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
					<div className="p-4 text-xl md:text-2xl font-semibold rounded-md cursor-pointer hover:bg-teal-700 transition-colors">
						{name}
					</div>
				</HoverCardTrigger>
				<HoverCardContent className="w-80 bg-teal-700 text-white border-none">
					<p className="text-base md:text-lg mb-2">
						{valueData.description}
					</p>
					<div className="mt-2">
						<h4 className="text-lg md:text-xl font-semibold">
							Why it's important:
						</h4>
						<p className="text-base md:text-lg mb-2">
							{valueData.importance}
						</p>
						<h4 className="text-lg md:text-xl font-semibold">
							What it looks like when lacking:
						</h4>
						<p className="text-base md:text-lg">
							{valueData.lacking}
						</p>
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
		<div className="fade-in bg-teal-600 text-yellow-50" id="toolkit">
			{/* Toolkit Section */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
						The VDC Train-up Toolkit
					</h1>
					<p className="text-lg md:text-3xl text-center max-w-3xl mx-auto mb-16">
						The VDC Train-up Toolkit comprises two distinct
						age-specific kits, each meticulously tailored to cater
						to specific developmental stages. This ensures that
						character education is relevant, engaging, and impactful
						throughout a child’s growth.
					</p>
					<div className="grid lg:grid-cols-2 gap-12">
						<div className="bg-teal-700 p-8 rounded-lg shadow-lg">
							<h2 className="text-4xl font-bold text-white mb-4">
								Kit 1: Early Development (4-9 Years)
							</h2>
							<p className="text-base md:text-2xl mb-6">
								This kit focuses on 12 core values that form the
								basis of moral and ethical growth during early
								childhood. Click on a value to learn more.
							</p>
							<ValueList data={kit1Data} />
						</div>
						<div className="bg-teal-700 p-8 rounded-lg shadow-lg">
							<h2 className="text-4xl font-bold text-white mb-4">
								Kit 2: Transitional Core Values (10-18 Years)
							</h2>
							<p className="text-base md:text-2xl mb-6">
								This kit focuses on 12 essential values that
								support the complex transition from childhood
								into young adulthood. Click on a value to learn
								more.
							</p>
							<ValueList data={kit2Data} />
						</div>
					</div>
				</div>
			</section>

			{/* PrinciplesPage content */}
			<section className="bg-teal-700 py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
						Toolkit Guiding Principles: The Foundation of VDC
						Parenting
					</h1>
					<p className="text-lg md:text-3xl text-center max-w-3xl mx-auto mb-16">
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
					</p>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="p-6 bg-teal-700 rounded-lg shadow-md">
							<h3 className="text-2xl md:text-4xl font-bold mb-2">
								1. Foundational Core Values
							</h3>
							<p className="text-base md:text-2xl">
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
						</div>
						<div className="p-6 bg-teal-700 rounded-lg shadow-md">
							<h3 className="text-2xl md:text-4xl font-bold mb-2">
								2. Natural Exclusive Predispositions
							</h3>
							<p className="text-base md:text-2xl">
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
						</div>
						<div className="p-6 bg-teal-700 rounded-lg shadow-md">
							<h3 className="text-2xl md:text-4xl font-bold mb-2">
								3. The Principle of Affirmation
							</h3>
							<p className="text-base md:text-2xl">
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
						</div>
						<div className="p-6 bg-teal-700 rounded-lg shadow-md">
							<h3 className="text-2xl md:text-4xl font-bold mb-2">
								4. The Operant Conditioning Principle
							</h3>
							<p className="text-base md:text-2xl">
								Based on the work of B.F. Skinner, this
								principle states that a behavior is strengthened
								or weakened based on the consequences that
								follows it. Positive behaviors are more likely
								to be repeated when followed by positive
								reinforcement, while negative behaviors decrease
								when followed by consequences. Why it matters to
								you: The VDC Toolkit applies this principle
								through its structured Affirm – Train – Track –
								Reward (ATTR) cycle. It moves beyond merely
								correcting misbehavior to proactively shaping
								character. Reward Cards are used for positive
								reinforcement, celebrating virtues like empathy
								and diligence, while Corrective Cards offer
								constructive feedback when improvement is
								needed. This consistent system promotes
								accountability, internalizes desired behaviors,
								and helps children understand that every
								behavior problem is fundamentally a values
								problem.
							</p>
						</div>
						<div className="p-6 bg-teal-700 rounded-lg shadow-md">
							<h3 className="text-2xl md:text-4xl font-bold mb-2">
								5. The Habit Loop Principle
							</h3>
							<p className="text-base md:text-2xl">
								Character isn’t built in a day—it’s built in
								daily routines. Rooted in Charles Duhigg's
								model, this principle explains that behaviors
								become automatic habits through a simple loop:
								Cue (trigger) → Routine (the behavior) → Reward
								(positive reinforcement). Consistent repetition
								turns conscious efforts into effortless,
								ingrained habits. The VDC Train-Up Cards are
								designed to leverage this principle. They act as
								the "cue" with specific daily practices forming
								the "routine". The Reward Cards provide the
								"reward" (points, praise, privileges) that
								releases dopamine, making the habit satisfying
								and strengthening its repetition and retention.
								This systematic approach helps your child
								develop lasting positive habits, transforming
								values from abstract ideas into daily lived
								behaviors with less conscious effort over time.
							</p>
						</div>
						<div className="p-6 bg-teal-700 rounded-lg shadow-md">
							<h3 className="text-2xl md:text-4xl font-bold mb-2">
								6.The Feedback Loop Principle
							</h3>
							<p className="text-base md:text-2xl">
								Growth needs tracking and managing. This
								principle emphasizes that continuously tracking,
								measuring, and evaluating behavior is essential
								for effective management and improvement. It
								involves observing a child's actions, tracking
								their progress, providing feedback, and
								adjusting guidance accordingly. Why it matters
								to you: No more parenting in the dark. You’ll
								see what’s working, where help is needed, and
								how to guide your child step by step. The VDC
								Toolkit transforms parenting from guesswork to
								strategic, data-driven nurturing. The Train-Up
								Cards, Star Reward Cards, Corrective Cards, and
								the My VDC Reward Chart work together to create
								a visible, measurable, and accountable system.
								This allows you to: • Gain objective insight
								into behavior patterns. • Provide targeted
								support and celebrate progress. • Make adaptive
								adjustments to your parenting strategies based
								on clear data. • Empower your child to take
								ownership of their growth and develop a strong
								sense of responsibility.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Predispositions Section */}
			<section className="bg-teal-700 py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-yellow-50 text-center mb-12">
						The Four-Color Predispositions
					</h1>
					<p className="text-center text-yellow-50 max-w-3xl mx-auto mb-16">
						Understanding your child's natural disposition is key to
						effective parenting. Our toolkit helps you identify
						whether your child is Blue, Orange, Gold, or Green, so
						you can tailor your approach to their unique needs.
					</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div id="blue">
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
						</div>
						<div id="orange">
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
						</div>
						<div id="gold">
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
						</div>
						<div id="green">
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
						</div>
					</div>

					<div className="text-center mt-12">
						<a
							href="http://www.vdctoolkit.com/predisposition-quiz"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block font-bold py-3 px-8 text-lg rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1 bg-blue-600 text-white hover:bg-blue-700">
							Take the Predisposition Quiz
						</a>
					</div>
				</div>
			</section>
		</div>
	);
};
