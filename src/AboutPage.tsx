import type React from "react";
import * as react from "react";

export const AboutPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					About The VDC Toolkit
				</h1>
				<div className="max-w-4xl mx-auto text-gray-700 space-y-6">
					<p className="text-lg">
						Welcome to the Value Driven Child (VDC) Toolkit, a
						transformative journey of intentional parenting. This
						toolkit is thoughtfully designed to empower parents,
						guardians, and educators, providing a comprehensive
						resource aimed at nurturing character development in
						children.
					</p>
					<p>
						The VDC Toolkit offers a holistic approach to parenting,
						seamlessly blending education, motivation, and guidance
						to help children become the best versions of themselves.
						With an array of carefully designed resources, this
						toolkit equips you with the tools necessary to nurture
						strong character and instill enduring values that will
						serve children throughout their lives.
					</p>
					<h2 className="text-2xl font-bold text-gray-800 pt-6">
						Why Choose the VDC Toolkit?
					</h2>
					<p>
						Traditional parenting methods often rely on a generic,
						one-size-fits-all approach. The VDC Toolkit offers a
						personalized and proactive strategy. We help you move
						beyond reactive parenting to shape your child’s internal
						moral compass. We also systematically integrate biblical
						reinforcement into each character value, anchoring moral
						growth in spiritual truth.
					</p>
					<ul className="list-disc list-inside space-y-2">
						<li>
							<strong>Personalized Parenting:</strong> We help you
							understand your child's unique predispositions for
							tailored guidance.
						</li>
						<li>
							<strong>Moral Compass Development:</strong> We focus
							on cultivating a child's moral core, not just
							correcting behavior.
						</li>
						<li>
							<strong>Proactive Approach:</strong> We provide
							tools to teach values before problems arise.
						</li>
						<li>
							<strong>Holistic Development:</strong> We nurture
							the full spectrum of a child's growth—cognitive,
							emotional, social, moral, and spiritual.
						</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
);
