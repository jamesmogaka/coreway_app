import * as React from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
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

export const AboutDetailsPage: React.FC = () => (
	<div className="relative min-h-screen flex flex-col text-yellow-50 overflow-hidden">
		{/* Main darkened linear gradient - matches Hero section */}
		<div className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none">
			<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-950 via-teal-900/95 to-cyan-950 opacity-100" />
			{/* Large radial highlight - matches Hero section */}
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110vw] h-[110vw] bg-gradient-radial from-teal-400/30 via-teal-700/0 to-transparent opacity-60 blur-2xl" />
		</div>
		<AnimatedSection className="py-20 flex-1 flex flex-col justify-center">
			<div className="container mx-auto px-6" id="about-details">
				<motion.div
					className="max-w-4xl mx-auto"
					variants={containerVariants}
					initial="hidden"
					animate="visible">
					<motion.h1
						className="text-4xl md:text-5xl font-bold text-center mb-12"
						variants={itemVariants}>
						About The VDC Toolkit
					</motion.h1>
					<motion.p
						className="text-base md:text-xl"
						variants={itemVariants}>
						Welcome to the Value Driven Child (VDC) Toolkit, a
						transformative journey of intentional parenting. This
						toolkit is thoughtfully designed to empower parents,
						guardians, and educators, providing a comprehensive
						resource aimed at nurturing character development in
						children.
					</motion.p>
					<motion.p
						className="text-base md:text-xl mt-6"
						variants={itemVariants}>
						The VDC Toolkit offers a holistic approach to parenting,
						seamlessly blending education, motivation, and guidance
						to help children become the best versions of themselves.
						With an array of carefully designed resources, this
						toolkit equips you with the tools necessary to nurture
						strong character and instill enduring values that will
						serve children throughout their lives.
					</motion.p>
					<motion.h2
						className="text-3xl md:text-4xl font-bold pt-12 mb-4"
						variants={itemVariants}>
						Why Choose the VDC Toolkit?
					</motion.h2>
					<motion.p
						className="text-base md:text-xl"
						variants={itemVariants}>
						Traditional parenting methods often rely on a generic,
						one-size-fits-all approach. The VDC Toolkit offers a
						personalized and proactive strategy. We help you move
						beyond reactive parenting to shape your child’s internal
						moral compass. We also systematically integrate biblical
						reinforcement into each character value, anchoring moral
						growth in spiritual truth.
					</motion.p>
					<motion.ul
						className="list-disc list-inside space-y-3 text-base md:text-xl mt-6"
						variants={itemVariants}>
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
					</motion.ul>
					<motion.div
						className="text-center mt-12"
						variants={itemVariants}>
						<Link to="/#about">
							<Button
								variant="outline"
								className="border-cream text-cream hover:bg-teal-medium hover:text-cream hover:border-teal-medium transition-all duration-200">
								Back to Main Page
							</Button>
						</Link>
					</motion.div>
				</motion.div>
			</div>
		</AnimatedSection>
	</div>
);
