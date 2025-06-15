import React, { useState } from "react";
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
			<h3 className={`text-2xl font-bold ${styles.text} text-center`}>
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
					className={`text-2xl font-bold ${styles.descriptionText} mb-4`}>
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
export interface ToolkitPageProps {
	onValueClick: (name: string, valueData: Value) => void;
}

const ValueList: React.FC<{
	data: ValueData;
	onValueClick: (name: string, valueData: Value) => void;
}> = ({ data, onValueClick }) => (
	<div className="grid grid-cols-3 gap-2 text-center">
		{Object.entries(data).map(([name, valueData]) => (
			<div
				key={name}
				onClick={() => onValueClick(name, valueData)}
				className="p-2 rounded-md cursor-pointer hover:bg-[#129990] transition-colors"
			>
				{name}
			</div>
		))}
	</div>
);

export const ToolkitPage: React.FC<ToolkitPageProps> = ({ onValueClick }) => {
	// State from PredispositionsPage
	const [active, setActive] = useState<ColorKey>("blue");

	const handleCardClick = (color: ColorKey) => {
		setActive(color);
	};

	return (
		<div className="fade-in bg-[#096B68] text-[#FFFBDE]">
			{/* Toolkit Section */}
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center mb-12">
						The VDC Train-up Toolkit
					</h1>
					<p className="text-center max-w-3xl mx-auto mb-16">
						The VDC Train-up Toolkit comprises two distinct
						age-specific kits, each meticulously tailored to cater
						to specific developmental stages. This ensures that
						character education is relevant, engaging, and impactful
						throughout a child’s growth.
					</p>
					<div className="grid lg:grid-cols-2 gap-12">
						<div className="bg-[#0d7a73] p-8 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold text-white mb-4">
								Kit 1: Early Development (4-9 Years)
							</h2>
							<p className="mb-6">
								This kit focuses on 12 core values that form the
								basis of moral and ethical growth during early
								childhood. Click on a value to learn more.
							</p>
							<ValueList
								data={kit1Data}
								onValueClick={onValueClick}
							/>
						</div>
						<div className="bg-[#0d7a73] p-8 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold text-white mb-4">
								Kit 2: Transitional Core Values (10-18 Years)
							</h2>
							<p className="mb-6">
								This kit focuses on 12 essential values that
								support the complex transition from childhood
								into young adulthood. Click on a value to learn
								more.
							</p>
							<ValueList
								data={kit2Data}
								onValueClick={onValueClick}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* PrinciplesPage content */}
			<section className="bg-[#129990] py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center mb-12">
						Toolkit Guiding Principles
					</h1>
					<p className="text-center max-w-3xl mx-auto mb-16">
						The VDC Train-up Toolkit is anchored on a set of six
						guiding principles that shape its structure, content,
						and implementation. These principles ensure that the
						toolkit is effective, comprehensive, and adaptable.
					</p>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						<div className="p-6 bg-[#0d7a73] rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">
								1. Foundational Core Values
							</h3>
							<p>
								Some values are more fundamental as they
								catalyze a wider range of virtues. We focus on
								24 foundational values that inspire over 170
								resultant values.
							</p>
						</div>
						<div className="p-6 bg-[#0d7a73] rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">
								2. Exclusive Natural Predispositions
							</h3>
							<p>
								Each child is unique. We help you identify your
								child's natural predisposition to tailor your
								parenting for optimal growth.
							</p>
						</div>
						<div className="p-6 bg-[#0d7a73] rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">
								3. Age-Specific Relevance
							</h3>
							<p>
								The toolkit is divided into two age-specific
								kits to ensure content is always relevant and
								impactful.
							</p>
						</div>
						<div className="p-6 bg-[#0d7a73] rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">
								4. Actionable & Practical
							</h3>
							<p>
								We provide practical, real-world strategies for
								everyday parenting challenges.
							</p>
						</div>
						<div className="p-6 bg-[#0d7a73] rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">
								5. Parent-Child Partnership
							</h3>
							<p>
								We emphasize a collaborative approach where
								parents and children learn and grow together.
							</p>
						</div>
						<div className="p-6 bg-[#0d7a73] rounded-lg shadow-md">
							<h3 className="text-xl font-bold mb-2">
								6. Holistic Development
							</h3>
							<p>
								Our toolkit addresses moral, ethical, and
								emotional growth for a well-rounded character.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Predispositions Section */}
			<section className="bg-[#096B68] py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-[#FFFBDE] text-center mb-12">
						The Four-Color Predispositions
					</h1>
					<p className="text-center text-[#FFFBDE] max-w-3xl mx-auto mb-16">
						Understanding your child's natural disposition is key to
						effective parenting. Our toolkit helps you identify
						whether your child is Blue, Orange, Gold, or Green, so
						you can tailor your approach to their unique needs.
					</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
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
						<div>
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
						<div>
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
						<div>
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
