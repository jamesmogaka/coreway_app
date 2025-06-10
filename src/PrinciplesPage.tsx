import type React from "react";
import * as react from "react";

export const PrinciplesPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Our Guiding Principles
				</h1>
				<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
					The VDC Train-up Toolkit is anchored on a set of six guiding
					principles that shape its structure, content, and
					implementation. These principles ensure that the toolkit is
					effective, comprehensive, and adaptable.
				</p>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							1. Foundational Core Values
						</h3>
						<p className="text-gray-600">
							Some values are more fundamental as they catalyze a
							wider range of virtues. We focus on 24 foundational
							values that inspire over 170 resultant values.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							2. Exclusive Natural Predispositions
						</h3>
						<p className="text-gray-600">
							Each child is unique. We help you identify your
							child's natural predisposition to tailor your
							parenting for optimal growth.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							3. Affirmation
						</h3>
						<p className="text-gray-600">
							Positive statements shape thoughts and behaviors. We
							use affirmation to reinforce self-belief and a
							positive identity rooted in truth.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							4. Operant Conditioning
						</h3>
						<p className="text-gray-600">
							Behavior is shaped by consequences. We use a system
							of rewards and corrective measures to instill values
							and guide behavior effectively.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							5. The Habit Loop
						</h3>
						<p className="text-gray-600">
							Consistent repetition transforms behaviors into
							automatic habits. Our system helps create positive
							habits through a cue-routine-reward cycle.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							6. The Feedback Loop
						</h3>
						<p className="text-gray-600">
							What gets measured gets managed. We provide tools to
							track, measure, and evaluate behavior, which is
							essential for effective improvement.
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>
);
