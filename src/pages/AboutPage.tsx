import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Target, Lightbulb, ArrowRight } from "lucide-react";
import { HashLink } from "react-router-hash-link";

import aboutPattern from "@/assets/patterns/about-pattern.svg";

export function AboutPage() {
	return (
		<section
			id="about"
			className="relative py-20 bg-gradient-to-br from-teal-700 via-teal-600 via-70% to-cyan-700 overflow-hidden">
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
			<div className="container mx-auto px-4">
				<motion.div
					className="text-center mb-16"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.5 }}
					variants={{
						hidden: {},
						visible: {
							transition: { staggerChildren: 0.18 },
						},
					}}>
					<motion.div
						initial={{ opacity: 0, y: -30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, ease: "easeOut" }}>
						<Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4">
							About CoreWayParenting
						</Badge>
					</motion.div>
					<motion.h2
						className="text-3xl sm:text-4xl font-bold text-yellow-50 mb-6"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							delay: 0.15,
							ease: "easeOut",
						}}>
						A Transformative Journey of Intentional Parenting
					</motion.h2>
					<motion.p
						className="text-lg sm:text-xl text-yellow-50 max-w-3xl mx-auto"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							delay: 0.3,
							ease: "easeOut",
						}}>
						We&apos;re a faith-aligned child development
						organization dedicated to transforming parenting across
						Africa and beyond. Through our tools and trainings, we
						equip families and institutions to nurture children with
						discipline, godliness, and character.
					</motion.p>
				</motion.div>

				<div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
					<motion.div
						className="relative"
						initial={{ opacity: 0, x: -40 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true, amount: 0.4 }}
						transition={{ duration: 0.8, ease: "easeOut" }}>
						<img
							src="/images/7.png"
							alt="Children learning values"
							width={500}
							height={400}
							className="rounded-xl shadow-lg"
						/>
					</motion.div>
					<div className="space-y-8">
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{
								duration: 0.8,
								ease: "easeOut",
								delay: 0.1,
							}}>
							<Card className="border-r-4 border-r-blue-500 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Target className="h-6 w-6 text-blue-600" />
										<span>Our Mission</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-yellow-50">
										To restore and strengthen the moral
										foundation of children by equipping
										families and communities with effective,
										faith-rooted parenting resources.
									</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.3 }}
							transition={{
								duration: 0.8,
								ease: "easeOut",
								delay: 0.25,
							}}>
							<Card className="border-r-4 border-r-orange-500 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg">
								<CardHeader>
									<CardTitle className="flex items-center space-x-2">
										<Lightbulb className="h-6 w-6 text-orange-600" />
										<span>Our Vision</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-yellow-50">
										A generation raised with purpose, guided
										by values, and equipped to lead with
										integrity.
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
				<motion.div
					className="flex justify-center mt-16"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{
						duration: 0.5,
						delay: 0.4,
						ease: "easeOut",
					}}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}>
					<HashLink to="/about-details#about-details">
						<Button
							size="lg"
							className="text-white font-semibold px-8 py-3 rounded-lg shadow-lg text-lg flex items-center justify-center gap-2 transition-all duration-200 border-2 border-yellow-50"
							style={{ background: 'linear-gradient(to right, #14b8a6 0%, #14b8a6cc 40%, #14b8a644 60%, transparent 100%)' }}
						>
							Learn More
							<span className="ml-2 flex items-center"><ArrowRight className="w-5 h-5" /></span>
						</Button>
					</HashLink>
				</motion.div>
			</div>
		</section>
	);
}
