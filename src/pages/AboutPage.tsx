import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Target,
	Lightbulb,
	Heart,
	Users,
	BookOpen,
	Globe,
	ArrowRight,
} from "lucide-react";
import { HashLink } from "react-router-hash-link";

// Assuming you have this component
function SidebarGradient() {
	return (
		<div className="absolute inset-0 opacity-20 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"></div>
	);
}

export function AboutPage() {
	return (
		<section
			id="about"
			className="relative py-20 bg-gradient-to-br from-teal-700 via-teal-600 via-70% to-cyan-700 overflow-hidden">
			<SidebarGradient />
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
							🌟 CorePath Impact Brand Profile
						</Badge>
					</motion.div>
					<motion.h2
						className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-yellow-50 drop-shadow"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							delay: 0.15,
							ease: "easeOut",
						}}>
						Shaping Hearts. Shaping Futures.
					</motion.h2>
					<motion.p
						className="text-base md:text-lg text-yellow-100 max-w-2xl mx-auto mb-2 font-normal"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							delay: 0.4,
							ease: "easeOut",
						}}>
						At CorePath Impact, we believe parenting is more than a
						duty — it is sacred stewardship. We exist to empower
						parents to raise children of strong character and
						eternal purpose through intentional, God-honoring
						parenting.
					</motion.p>
					<motion.p
						className="text-base md:text-lg text-yellow-200 max-w-2xl mx-auto font-semibold italic"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{
							duration: 0.7,
							delay: 0.5,
							ease: "easeOut",
						}}>
						“We don’t just raise children. We steward futures.”
					</motion.p>
				</motion.div>

				{/* First Row - Mission & Vision */}
				<div className="grid md:grid-cols-2 gap-4 lg:gap-8 items-center mb-16">
					<motion.div
						className="relative flex justify-center"
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
					<div className="space-y-6">
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
									<CardTitle className="flex items-center space-x-2 text-yellow-50 text-2xl md:text-3xl font-extrabold tracking-tight">
										<Target className="h-6 w-6 text-blue-400" />
										<span>Our Mission</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-lg md:text-xl text-yellow-100 font-medium leading-relaxed">
										Transforming families and communities
										through intentional, values-based
										parenting. We empower parents to raise
										children of conviction, courage, and
										purpose—equipping them with tools,
										guidance, and support for God-honoring
										parenting.
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
									<CardTitle className="flex items-center space-x-2 text-yellow-50 text-2xl md:text-3xl font-extrabold tracking-tight">
										<Lightbulb className="h-6 w-6 text-orange-400" />
										<span>Our Vision</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-lg md:text-xl text-yellow-100 font-medium leading-relaxed">
										Every heart anchored on timeless Godly
										values. We envision every generation
										rising with hearts anchored in Godly
										values and lives aligned to eternal
										purpose—children who will transform
										families, communities, and nations.
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>

				{/* Second Row - Core Beliefs & Programs */}
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.3 }}
						transition={{
							duration: 0.8,
							ease: "easeOut",
							delay: 0.1,
						}}>
						<Card className="border-r-4 border-r-green-500 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg h-full">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2 text-yellow-50 text-xl md:text-2xl font-bold tracking-tight">
									<Heart className="h-5 w-5 text-green-400" />
									<span>Sacred Stewardship</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-lg md:text-xl text-yellow-100 font-medium leading-relaxed">
									Parenting is a divine assignment to steward
									a child's heart, habits, and destiny—the
									most impactful form of discipleship.
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
							delay: 0.2,
						}}>
						<Card className="border-r-4 border-r-purple-500 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg h-full">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2 text-yellow-50 text-xl md:text-2xl font-bold tracking-tight">
									<BookOpen className="h-5 w-5 text-purple-400" />
									<span>VDC Toolkit</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-lg md:text-xl text-yellow-100 font-medium leading-relaxed">
									Our structured Values Driven Child system
									makes values teachable and practical for
									everyday parenting.
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
							delay: 0.3,
						}}>
						<Card className="border-r-4 border-r-pink-500 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg h-full">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2 text-yellow-50 text-xl md:text-2xl font-bold tracking-tight">
									<Users className="h-5 w-5 text-pink-400" />
									<span>Community Building</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-lg md:text-xl text-yellow-100 font-medium leading-relaxed">
									Networks of like-minded families committed
									to values-driven parenting and character
									formation.
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
							delay: 0.4,
						}}>
						<Card className="border-r-4 border-r-cyan-500 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg h-full">
							<CardHeader>
								<CardTitle className="flex items-center space-x-2 text-yellow-50 text-xl md:text-2xl font-bold tracking-tight">
									<Globe className="h-5 w-5 text-cyan-400" />
									<span>Global Impact</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-lg md:text-xl text-yellow-100 font-medium leading-relaxed">
									By 2030: 1M families equipped, 2K
									partnerships, 100K mentors trained across
									Africa and beyond.
								</p>
							</CardContent>
						</Card>
					</motion.div>
				</div>

				{/* Core Philosophy */}
				<motion.div
					className="text-center mb-16"
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.3 }}
					transition={{ duration: 0.8, ease: "easeOut" }}>
					<Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg max-w-4xl mx-auto">
						<CardContent className="p-8">
							<h3 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-4 text-yellow-50 ">
								Why Values Matter
							</h3>
							<p className="text-lg md:text-xl text-yellow-100 mb-4 font-medium leading-relaxed">
								Values are the foundation of behavior, habits,
								and character—the very fabric of society.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-yellow-50 mb-4">
								<span className="bg-white/20 px-3 py-1 rounded-lg text-base md:text-lg font-semibold">
									Values
								</span>
								{/* Arrow for mobile (down), hidden on sm+ */}
								<span className="block sm:hidden">
									<ArrowRight className="w-5 h-5 text-yellow-200 rotate-90 mx-auto" />
								</span>
								{/* Arrow for desktop (right), hidden on xs */}
								<span className="hidden sm:block">
									<ArrowRight className="w-5 h-5 text-yellow-200" />
								</span>
								<span className="bg-white/20 px-3 py-1 rounded-lg text-base md:text-lg font-semibold">
									Behaviors
								</span>
								<span className="block sm:hidden">
									<ArrowRight className="w-5 h-5 text-yellow-200 rotate-90 mx-auto" />
								</span>
								<span className="hidden sm:block">
									<ArrowRight className="w-5 h-5 text-yellow-200" />
								</span>
								<span className="bg-white/20 px-3 py-1 rounded-lg text-base md:text-lg font-semibold">
									Habits
								</span>
								<span className="block sm:hidden">
									<ArrowRight className="w-5 h-5 text-yellow-200 rotate-90 mx-auto" />
								</span>
								<span className="hidden sm:block">
									<ArrowRight className="w-5 h-5 text-yellow-200" />
								</span>
								<span className="bg-white/20 px-3 py-1 rounded-lg text-base md:text-lg font-semibold">
									Character
								</span>
							</div>
							<p className="text-base md:text-lg text-yellow-200 font-semibold italic">
								“We rebuild the foundation—one heart, one value,
								one family at a time.”
							</p>
						</CardContent>
					</Card>
				</motion.div>

				<motion.div
					className="flex justify-center"
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
					<HashLink to="/about-details#">
						<Button
							size="lg"
							className="text-white font-semibold px-8 py-3 rounded-lg shadow-lg text-lg flex items-center justify-center gap-2 transition-all duration-200 border-2 border-yellow-50"
							style={{
								background:
									"linear-gradient(to right, #14b8a6 0%, #14b8a6cc 40%, #14b8a644 60%, transparent 100%)",
							}}>
							Learn More
							<span className="ml-2 flex items-center">
								<ArrowRight className="w-5 h-5" />
							</span>
						</Button>
					</HashLink>
				</motion.div>
			</div>
		</section>
	);
}

export default AboutPage;
