import * as react from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import aboutPattern from "@/assets/patterns/about-pattern.svg";

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

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { EnrollmentModal } from "@/components/EnrollmentModal";

interface TrainingCourse {
	id: string;
	title: string;
	description: string;
	date: string; // ISO date string
	start_time: string; // ISO time string
	end_time: string; // ISO time string
}

export const TrainingPage: react.FC = () => {
	const [enrollmentOpen, setEnrollmentOpen] = react.useState(false);
	const [selectedCourseId, setSelectedCourseId] = react.useState<string | null>(null);
	const [courses, setCourses] = useState<TrainingCourse[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			setLoading(true);
			const { data, error } = await supabase
				.from("courses")
				.select("id, title, description, date, start_time, end_time");
			if (error) {
				setError("Failed to load courses.");
				setLoading(false);
				return;
			}
			setCourses(data || []);
			setLoading(false);
		};
		fetchCourses();
	}, []);

	return (
		<section id="training" className="overflow-x-hidden">
			<motion.section className="relative py-20 bg-gradient-to-br from-teal-700 via-teal-600 via-70% to-cyan-700 overflow-hidden text-yellow-50">
				{/* Creative accent overlays for vibrancy and depth */}
				<div className="absolute inset-0 -z-10 pointer-events-none">
					{/* Sophisticated SVG pattern overlay */}
					<img
						src={aboutPattern}
						alt="decorative pattern"
						className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none select-none"
					/>

					{/* Main creative linear gradient overlay */}
					<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-700/80 via-teal-600/60 to-cyan-700/40 opacity-100" />
					{/* Subtle orange highlight for contrast */}
					<div className="absolute top-[-10%] left-[60%] w-[38vw] h-[38vw] bg-gradient-radial from-orange-400/20 via-transparent to-transparent opacity-40 blur-2xl rotate-12" />
					{/* Vibrant cyan/teal radial highlight */}
					<div className="absolute bottom-[-18%] right-[-10%] w-[54vw] h-[54vw] bg-gradient-radial from-cyan-300/20 via-transparent to-transparent opacity-30 blur-2xl" />
				</div>
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
							parenting to nurture your child's growth and
							character.
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
							{loading && (
								<div className="text-center py-8 text-lg">
									Loading courses...
								</div>
							)}
							{error && (
								<div className="text-center py-8 text-red-300">
									{error}
								</div>
							)}
							{!loading && !error && courses.length === 0 && (
								<div className="text-center py-8">
									No training courses available at the moment.
								</div>
							)}
							{!loading &&
								!error &&
								courses.map(course => (
									<motion.div
										key={course.id}
										className="md:flex items-center justify-between p-4 bg-teal-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
										variants={cardItem}
										whileHover={{
											y: -5,
											transition: { duration: 0.2 },
										}}>
										<div>
											<h3 className="text-xl font-bold">
												{course.title}
											</h3>
											<p className="text-base md:text-lg">
												<strong>Date:</strong> {new Date(course.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} |
												<strong>Time:</strong> {course.start_time?.slice(0,5)} - {course.end_time?.slice(0,5)}
											</p>
											<p className="text-base md:text-lg">
												{course.description}
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
											}}
											onClick={() => {
												setSelectedCourseId(course.id);
												setEnrollmentOpen(true);
											}}
										>
											Enroll Now
										</motion.button>
									</motion.div>
								))}
						</motion.div>
					</motion.div>
				</div>
			</motion.section>
			<EnrollmentModal
				open={enrollmentOpen}
				onClose={() => setEnrollmentOpen(false)}
				courseId={selectedCourseId || ''}
			/>
		</section>
	);
};
