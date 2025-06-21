import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Heart, CheckCircle } from "lucide-react";
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
	return (
		<section
			id="home"
			className="relative bg-gradient-to-b pt-2 sm:pt-4 lg:pt-8 pb-20 sm:pb-24 lg:pb-32 overflow-hidden">
			{/* Complicated teal gradient background */}
			<div className="fixed inset-0 -z-10 pointer-events-none">
				{/* Main darkened linear gradient - stays dark */}
				<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-950 via-teal-900/95 to-cyan-950 opacity-100" />
				{/* Large radial highlight - more visible, less blur, more saturated */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110vw] h-[110vw] bg-gradient-radial from-teal-400/30 via-teal-700/0 to-transparent opacity-60 blur-2xl" />
				{/* Bottom right shadow - more visible, less blur, more cyan */}
				<div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-cyan-700/70 via-teal-900/70 to-transparent opacity-80 blur-xl" />
				{/* Accent radial - more defined, higher opacity, less blur */}
				<div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-cyan-400/40 via-transparent to-transparent opacity-50 blur" />
			</div>
			<div className="container mx-auto px-4">
				<motion.div
					className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible">
					<motion.div className="space-y-6" variants={itemVariants}>
						<div className="space-y-4 text-yellow-50">
							<motion.div variants={itemVariants}>
								<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-sm">
									Transform Children&apos;s Lives
								</Badge>
							</motion.div>
							<motion.h1
								className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight break-words"
								variants={itemVariants}>
								Intentional Parenting for a Value-Driven Child
							</motion.h1>
							<motion.p
								className="text-lg sm:text-xl max-w-2xl"
								variants={itemVariants}>
								Nurture morally grounded, resilient, and
								successful children with the VDC Toolkit.
							</motion.p>
						</div>

						<motion.div
							className="bg-yellow-50 p-6 rounded-lg shadow-lg border-l-4 border-orange-500"
							variants={itemVariants}>
							<h3 className="text-lg font-semibold text-gray-900">
								Transform Behavior. Build Character. Shape
								Destiny.
							</h3>
						</motion.div>

						<motion.div
							className="flex flex-col sm:flex-row flex-wrap gap-4"
							variants={itemVariants}>
							<Button
								size="lg"
								className="bg-teal-900 hover:bg-teal-400 text-yellow-50 w-full sm:w-auto border border-yellow-50"
								onClick={() => {
									const element =
										document.getElementById("toolkit");
									if (element) {
										element.scrollIntoView({
											behavior: "smooth",
										});
									}
								}}>
								<BookOpen className="h-5 w-5 mr-2" />
								Explore the Toolkit
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-teal-900 hover:bg-teal-400 text-yellow-50 w-full sm:w-auto border border-yellow-50"
								onClick={() => {
									const element =
										document.getElementById("training");
									if (element) {
										element.scrollIntoView({
											behavior: "smooth",
										});
									}
								}}>
								<Users className="h-5 w-5 mr-2" />
								Join Training
							</Button>
							<Button
								size="lg"
								variant="outline"
								className="bg-teal-900 hover:bg-teal-400 text-yellow-50 w-full sm:w-auto border border-yellow-50"
								onClick={() => navigate("/patner")}>
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
