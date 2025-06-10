import * as react from "react";
import React, { useState } from "react";
import type { Predispositions, Predisposition } from "./components";

export const PredispositionsPage: react.FC = () => {
	const [active, setActive] = useState<string>("blue");

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

	interface CardProps {
		color: string;
		children: React.ReactNode;
	}
	const Card: react.FC<CardProps> = ({ color, children }) => (
		<div
			className={`p-6 bg-${color}-100 rounded-t-lg shadow-md predisposition-card ${
				active === color ? "active-card" : ""
			}`}
			onClick={() => setActive(color)}>
			<h3 className={`text-2xl font-bold text-${color}-800 text-center`}>
				{children}
			</h3>
		</div>
	);

	interface DescriptionProps {
		color: string;
		data: Predisposition;
	}
	const Description: react.FC<DescriptionProps> = ({ color, data }) => (
		<div className={`description-panel ${active === color ? "show" : ""}`}>
			<div className="description-content fade-in">
				<h2 className={`text-2xl font-bold text-${color}-800 mb-4`}>
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

	return (
		<div className="fade-in">
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
						The Four-Color Predispositions
					</h1>
					<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
						Discover your child's natural predisposition quadrant to
						better understand their needs, communication style, and
						motivations. This is the key to unlocking personalized
						and effective parenting.
					</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<Card color="blue">
								{predispositions.blue.title}
							</Card>
							<Description
								color="blue"
								data={predispositions.blue}
							/>
						</div>
						<div>
							<Card color="orange">
								{predispositions.orange.title}
							</Card>
							<Description
								color="orange"
								data={predispositions.orange}
							/>
						</div>
						<div>
							<Card color="yellow">
								{predispositions.gold.title}
							</Card>
							<Description
								color="yellow"
								data={predispositions.gold}
							/>
						</div>
						<div>
							<Card color="green">
								{predispositions.green.title}
							</Card>
							<Description
								color="green"
								data={predispositions.green}
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
