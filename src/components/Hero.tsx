import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Heart, CheckCircle } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { AnimatedArrow } from "./AnimatedArrow";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			delayChildren: 0.2,
			ease: "easeOut",
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

export function HeroSection() {
	const navigate = useNavigate();

	const handleScrollTo = useCallback((id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
			});
		}
	}, []);

	const handleExploreToolkitClick = useCallback(() => {
		handleScrollTo("toolkit");
	}, [handleScrollTo]);

	const handleJoinTrainingClick = useCallback(() => {
		handleScrollTo("training");
	}, [handleScrollTo]);

	const handlePartnerClick = useCallback(() => {
		navigate("/patner");
	}, [navigate]);

	return (
		<section
			id="home"
			className="relative pt-2 sm:pt-4 lg:pt-8 pb-20 sm:pb-24 lg:pb-32">
			<div className="container mx-auto px-4">
				<motion.div
					className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible">
					<motion.div className="space-y-6" variants={itemVariants}>
						<div className="space-y-4 text-yellow-50">
							<motion.h1
								className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight break-words bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg mb-4"
								variants={itemVariants}>
								CorePath Impact
							</motion.h1>
							<motion.div variants={itemVariants}>
								<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-sm">
									Transform Children&apos;s Lives
								</Badge>
							</motion.div>
							<motion.h1
								className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight break-words"
								variants={itemVariants}>
								Intentional, Deliberate, Structured, Value
								Driven Parenting.
							</motion.h1>
							<motion.p
								className="text-lg sm:text-xl max-w-2xl"
								variants={itemVariants}>
								At CorePath Impact, we believe parenting is
								sacred stewardship — a divine calling to shape
								the heart of every child with timeless values
								that anchor identity and unlock divine purpose.
								We equip families with structured, spiritual
								tools to raise children of character,
								compassion, and calling.
							</motion.p>
						</div>

						<motion.div
							className="bg-yellow-50 p-6 rounded-lg shadow-lg border-l-4 border-orange-500"
							variants={itemVariants}>
							<h3 className="text-lg font-semibold text-gray-900">
								Restoring the Soul of Society — Where Values Are
								Rooted and Purpose Is Lived
							</h3>
						</motion.div>

						<motion.div
							className="flex flex-col sm:flex-row flex-wrap gap-4"
							variants={itemVariants}>
							<Button
								size="lg"
								className="bg-teal-900 hover:bg-teal-400 text-yellow-50 w-full sm:w-auto border border-yellow-50"
								onClick={handleExploreToolkitClick}>
								<BookOpen className="h-5 w-5 mr-2" />
								Explore the Toolkit
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-teal-900 hover:bg-teal-400 text-yellow-50 w-full sm:w-auto border border-yellow-50"
								onClick={handleJoinTrainingClick}>
								<Users className="h-5 w-5 mr-2" />
								Join Training
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-teal-900 hover:bg-teal-400 text-yellow-50 w-full sm:w-auto border border-yellow-50"
								onClick={handlePartnerClick}>
								<Heart className="h-5 w-5 mr-2" />
								Partner With Us
							</Button>
						</motion.div>
					</motion.div>

					<motion.div
						className="relative order-first lg:order-last"
						variants={itemVariants}>
						<img
							src="/images/8.png"
							alt="A happy family"
							className="rounded-2xl shadow-2xl w-full h-auto  object-cover"
						/>
						<motion.div
							className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-yellow-50 p-3 sm:p-4 rounded-lg shadow-lg z-10"
							variants={itemVariants}>
							<div className="flex items-center space-x-3">
								<div className="bg-green-100 p-2 rounded-full">
									<CheckCircle className="h-6 w-6 text-green-600" />
								</div>
								<div>
									<p className="font-semibold text-gray-900">
										24 Core Values
									</p>
									<p className="text-sm text-gray-600">
										Ages 4-18
									</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
			<AnimatedArrow />
		</section>
	);
}
