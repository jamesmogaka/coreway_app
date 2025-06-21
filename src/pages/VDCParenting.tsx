// import Image from "next/image"; // Removed because not using Next.js
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const vdc_sections = [
	{
		title: "Raising Children with Values, Identity & Purpose",
		text: "The Value Driven Child (VDC) Parenting Approach is a transformative, scripture-rooted model of parenting designed for the modern world—but anchored in timeless truth. It offers a structured, intentional, and spiritually grounded way to raise children who don’t just behave well—but live well.",
		image: "/images/vdc1.png",
	},
	{
		title: "From Chaos to Clarity",
		text: "Unlike traditional parenting methods that are reactive, one-size-fits-all, or focused on mere compliance, the VDC Parenting Approach is:\n\n• Personalized – Built around each child’s unique God-given design.\n• Proactive – Focused on instilling values before problems arise.\n• Purposeful – Anchored in six timeless principles.\n• Structured – Uses the ATTR Cycle.\n• Scripture-rooted – Reinforced through Bible truths. \n\n This framework gives parents clarity, tools, and confidence to raise children who are morally grounded, emotionally resilient, spiritually secure, and mentally prepared to thrive in today’s complex world.",
		image: "/images/vdc2.png",
	},
	{
		title: "Parenting as Sacred Stewardship",
		text: "At the heart of the VDC approach lies the principle of Parenting as Sacred Stewardship. We believe every child is a unique masterpiece, fearfully and wonderfully made, endowed by a divine blueprint and an inherent purpose. This philosophy calls us to move beyond simply managing behavior; it challenges us to understand, cherish, and cultivate the distinct individual God has placed in our care. Our role is to be insightful stewards, nurturing the specific strengths and talents woven into their very being.",
		image: "/images/vdc3.png",
	},
	{
		title: "Six Timeless Parenting Principles",
		text: "1. Foundational Core Values – 24 values per age group unlocking 200+ additional values and 250+ behaviors.\n2. Exclusive Predispositions – Learn to parent your child according to their type: Gold, Blue, Green, or Orange.\n3. Affirmation – Speak life into identity with truth-based affirmations.\n4. Operant Conditioning – Build habits through rewards and constructive correction.\n5. Habit Loop Principle – Link values to daily routines.\n6. Feedback Loop Principle – Monitor progress and adjust with accountability.",
		image: "/images/vdc4.png",
	},
	{
		title: "The ATTR Cycle: A Daily Parenting Rhythm",
		text: "Affirm: Reinforce identity through emotionally nurturing affirmations.\nTrain: Teach values with Train-up Cards and scripture.\nTrack: Use charts and tools to monitor growth.\nReward: Celebrate growth with Star Cards or use Corrective Cards.",
		image: "/images/vdc5.png",
	},
	{
		title: "What Makes VDC Unique?",
		text: "✅ More Than Behavior Fixing: Form inner compass.\n✅ Not One-Size-Fits-All: Based on your child's natural wiring.\n✅ Anchored in Scripture: Every value is biblically grounded.\n✅ Developmentally Smart: Kits for ages 4–9 and 10–18.\n✅ Backed by Neuroscience: Built on operant learning, habit science, and feedback loops.",
		image: "/images/vdc6.png",
	},
	{
		title: "Tailoring to Every Stage",
		text: "• Birth–4 Years: The Observational Sponge—create a secure emotional base.\n• 4–9 Years: Active Learners—build core values with repetition.\n• 10–18 Years: Internship Phase—real-life application of values and identity.",
		image: "/images/vdc7.png",
	},
	{
		title: "The VDC Promise",
		text: "Expect to raise:\n• Morally Grounded Children with strong values.\n• Resilient Individuals who lead with courage.\n• Authentic Identity rooted in God-given design.\n• Purpose-Driven Lives equipped for contribution and leadership.",
		image: "/images/vdc8.png",
	},
	{
		title: "The Value-Driven Child",
		text: "Not just obedient—but internally motivated, emotionally grounded, spiritually anchored, and relationally wise. They walk in love, truth, and courage—even under pressure.",
		image: "/images/vdc9.png",
	},
	{
		title: "A Rallying Call",
		text: "The time for one-size-fits-all parenting is over. Join us in raising a generation that leads with integrity and light. Adopt the VDC Toolkit today—and leave a legacy of values.",
		image: "/images/vdc10.png",
	},
];

function VdcSection({
	title,
	text,
	image,
	reverse,
}: {
	title: string;
	text: string;
	image: string;
	reverse?: boolean;
}) {
	return (
		<motion.section
			className="py-16"
			initial={{ opacity: 0, y: 60 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25 }}
			transition={{ duration: 0.7, ease: "easeOut" }}>
			<motion.div
				className={cn(
					"flex flex-col md:flex-row items-center gap-10",
					reverse && "md:flex-row-reverse"
				)}
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}>
				<div className="md:w-1/2">
					<h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-50">
						{title}
					</h2>
					<p className="whitespace-pre-line text-yellow-50 text-lg leading-relaxed">
						{text}
					</p>
				</div>
				<div className="md:w-1/2">
					<img
						src={image}
						alt={title}
						width={600}
						height={400}
						className="rounded-xl shadow-xl"
					/>
				</div>
			</motion.div>
		</motion.section>
	);
}

import { HashLink } from "react-router-hash-link";
import { ArrowLeft } from "lucide-react";

export default function VdcParenting() {
	return (
		<>
			{/* Complicated teal gradient background */}
			<div className="fixed inset-0 -z-10 pointer-events-none">
				{/* Main darkened linear gradient */}
				<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-900 via-teal-800/90 to-cyan-900 opacity-95" />
				{/* Large radial highlight, subdued */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] bg-gradient-radial from-teal-800/70 via-transparent to-transparent opacity-50 blur-3xl" />
				{/* Bottom right shadow */}
				<div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-teal-950 via-teal-800/70 to-transparent opacity-60 blur-2xl" />
				{/* Accent radial, more subtle */}
				<div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-cyan-800/60 via-transparent to-transparent opacity-25 blur-2xl" />
			</div>

			<div className="container px-4 md:px-12 max-w-7xl mx-auto">
				<motion.h1
					className="text-4xl md:text-5xl font-extrabold text-center mt-12 mb-16 text-yellow-50 drop-shadow-lg"
					initial={{ opacity: 0, y: -30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: "easeOut" }}>
					The VDC Parenting Approach
				</motion.h1>
				{vdc_sections.map((section, index) => (
					<VdcSection
						key={index}
						title={section.title}
						text={section.text}
						image={section.image}
						reverse={index % 2 === 1}
					/>
				))}
				<div className="flex justify-center mt-12 mb-10">
					<HashLink to="/#home" smooth>
						<button
							className="text-white font-semibold px-8 py-3 rounded-lg shadow-lg text-lg flex items-center justify-center gap-2 transition-colors duration-200 border-2 border-cyan-500"
							style={{
								background:
									"linear-gradient(to left, #14b8a6 0%, #14b8a6cc 40%, #14b8a644 60%, transparent 100%)",
							}}>
							<span className="mr-2 flex items-center">
								<ArrowLeft className="w-5 h-5" />
							</span>
							Back to Home
						</button>
					</HashLink>
				</div>
			</div>
		</>
	);
}
