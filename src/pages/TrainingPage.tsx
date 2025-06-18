import * as react from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Animation variants with proper TypeScript types
const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
		},
	},
};

const staggerContainer: Variants = {
	hidden: { opacity: 0 },
	visible: (i = 1) => ({
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			when: "beforeChildren",
			staggerDirection: 1,
			delayChildren: i ? i * 0.1 : 0,
		},
	}),
};

const cardItem: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const TrainingPage: react.FC = () => (
	<div id="training" className="overflow-x-hidden">
		<motion.section
			className="py-20 bg-teal-600 text-yellow-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}>
			<div className="container mx-auto px-6">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					variants={staggerContainer}
					className="text-center">
					<motion.h1
						className="text-4xl font-bold mb-12"
						variants={fadeInUp}>
						Parenting Training Classes
					</motion.h1>
					<motion.p
						className="text-lg md:text-xl max-w-3xl mx-auto mb-16"
						variants={fadeInUp}
						transition={{ delay: 0.1 }}>
						Enroll in our training classes to master the VDC
						Toolkit. Our expert-led sessions provide in-depth
						guidance on applying the principles of value-driven
						parenting to nurture your child's growth and character.
					</motion.p>
				</motion.div>
				<motion.div
					className="bg-teal-900 p-8 rounded-lg shadow-lg"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					variants={staggerContainer}>
					<motion.h2
						className="text-2xl font-bold mb-6"
						variants={fadeInUp}>
						Upcoming Classes
					</motion.h2>
					<motion.div
						className="space-y-6"
						variants={staggerContainer}>
						<motion.div
							className="md:flex items-center justify-between p-4 bg-teal-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
							variants={cardItem}
							whileHover={{
								y: -5,
								transition: { duration: 0.2 },
							}}>
							<div>
								<h3 className="text-xl font-bold">
									Introduction to the VDC Toolkit
								</h3>
								<p className="text-base md:text-lg">
									<strong>Date:</strong> July 15, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-base md:text-lg">
									An overview of the core principles and how
									to get started.
								</p>
							</div>
							<motion.button
								className="mt-4 md:mt-0 bg-teal-600 text-yellow-50 hover:bg-teal-500 inline-block font-bold py-2 px-6 rounded-full shadow-md"
								whileHover={{
									scale: 1.05,
									backgroundColor: "#0d9488",
									boxShadow:
										"0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
								}}
								whileTap={{
									scale: 0.98,
									boxShadow:
										"0 2px 4px -2px rgb(0 0 0 / 0.1)",
								}}>
								Enroll Now
							</motion.button>
						</motion.div>
						<motion.div
							className="md:flex items-center justify-between p-4 bg-teal-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
							variants={cardItem}
							whileHover={{
								y: -5,
								transition: { duration: 0.2 },
							}}>
							<div>
								<h3 className="text-xl font-bold">
									Understanding Your Child's Predisposition
								</h3>
								<p className="text-base md:text-lg">
									<strong>Date:</strong> July 22, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-base md:text-lg">
									A deep dive into the four color types and
									personalized parenting strategies.
								</p>
							</div>
							<motion.button
								className="mt-4 md:mt-0 bg-teal-600 text-yellow-50 hover:bg-teal-500 inline-block font-bold py-2 px-6 rounded-full shadow-md"
								whileHover={{
									scale: 1.05,
									backgroundColor: "#0d9488",
									boxShadow:
										"0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
								}}
								whileTap={{
									scale: 0.98,
									boxShadow:
										"0 2px 4px -2px rgb(0 0 0 / 0.1)",
								}}>
								Enroll Now
							</motion.button>
						</motion.div>
						<motion.div
							className="md:flex items-center justify-between p-4 bg-teal-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
							variants={cardItem}
							whileHover={{
								y: -5,
								transition: { duration: 0.2 },
							}}>
							<div>
								<h3 className="text-xl font-bold">
									Advanced Habit Formation
								</h3>
								<p className="text-base md:text-lg">
									<strong>Date:</strong> July 29, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-base md:text-lg">
									Learn to apply the Habit Loop and Feedback
									Loop principles effectively.
								</p>
							</div>
							<motion.button
								className="mt-4 md:mt-0 bg-teal-600 text-yellow-50 hover:bg-teal-500 inline-block font-bold py-2 px-6 rounded-full shadow-md"
								whileHover={{
									scale: 1.05,
									backgroundColor: "#0d9488",
									boxShadow:
										"0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
								}}
								whileTap={{
									scale: 0.98,
									boxShadow:
										"0 2px 4px -2px rgb(0 0 0 / 0.1)",
								}}>
								Enroll Now
							</motion.button>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	</div>
);
