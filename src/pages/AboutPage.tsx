import * as react from "react";

export const AboutPage: react.FC = () => (
	<div className="fade-in" id="about">
		<section className="py-20 bg-teal-900 text-yellow-50">
			<div className="container mx-auto px-6">
				<h1 className="text-3xl md:text-5xl font-bold text-center mb-12">
					About The VDC Toolkit
				</h1>
				<div className="max-w-4xl mx-auto space-y-6">
					<p className="text-base md:text-xl">
						Welcome to the Value Driven Child (VDC) Toolkit, a
						transformative journey of intentional parenting. This
						toolkit is thoughtfully designed to empower parents,
						guardians, and educators, providing a comprehensive
						resource aimed at nurturing character development in
						children.
					</p>
					<p className="text-base md:text-xl">
						The VDC Toolkit offers a holistic approach to parenting,
						seamlessly blending education, motivation, and guidance
						to help children become the best versions of themselves.
						With an array of carefully designed resources, this
						toolkit equips you with the tools necessary to nurture
						strong character and instill enduring values that will
						serve children throughout their lives.
					</p>
					<h2 className="text-2xl md:text-4xl font-bold pt-6 mb-4">
						Why Choose the VDC Toolkit?
					</h2>
					<p className="text-base md:text-xl">
						Traditional parenting methods often rely on a generic,
						one-size-fits-all approach. The VDC Toolkit offers a
						personalized and proactive strategy. We help you move
						beyond reactive parenting to shape your child’s internal
						moral compass. We also systematically integrate biblical
						reinforcement into each character value, anchoring moral
						growth in spiritual truth.
					</p>
					<ul className="list-disc list-inside space-y-3 text-base md:text-xl">
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
