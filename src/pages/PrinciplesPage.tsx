import * as React from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useMediaQuery } from "@/hooks/use-media-query";

const principles = [
	{
		title: "Principle 1: The Principle of Foundational Core Values",
		content: (
			<>
				<p className="text-lg mt-2">
					Values are not isolated; they are intrinsically linked and
					interconnected, like roots, branches, and fruits. A touch on
					one value naturally touches others. Some values are more
					"foundational" than others because, when cultivated, they
					naturally lead to the development of many other positive
					virtues and behaviors (what we call "resultant values and
					behaviors") compared to others. Why it matters to you: It's
					practically impossible to intentionally teach a child over
					200 different values one by one. This principle helps us
					focus on a carefully selected set of just 24 foundational
					core values. By concentrating on these high-impact values,
					your child will naturally develop over 200 additional values
					and behaviors without your active involvement, resonating
					with the efficient Pareto's Rule (80/20 principle). These
					values are strategically divided into age-appropriate sets
					of 12 for early childhood (4-9 years) and 12 for adolescence
					(10-18 years).
				</p>
			</>
		),
	},
	{
		title: "Principle 2: The Principle of Natural Exclusive Predispositions",
		content: (
			<>
				<p className="text-lg mt-2">
					Every child is uniquely wired and is born with a divine
					imprint—a unique purpose and innate design. This includes
					their natural predispositions, which are inherent traits
					shaping their personality, learning style, emotional
					responses, and overall behavior. These aren't random; they
					are part of God's purposeful design meant to align each
					child to their divine purpose and calling. Why it matters to
					you: This principle moves beyond the "one-size-fits-all"
					myth of traditional parenting. Trying to mold a child
					against their natural bent can lead to frustration,
					disengagement, low self-esteem, anxiety, and even behavioral
					problems, as their authentic self feels suppressed. The VDC
					Toolkit includes a Color Predisposition Quiz to help you
					identify your child's unique type (Blue, Orange, Gold,
					Green). This allows you to adopt "Exclusive Parenting"—a
					tailored approach that aligns with your child's inherent
					traits, fostering their unique strengths and authentic
					growth- the God-given design.
				</p>
			</>
		),
	},
	{
		title: "Principle 3: The Principle of Affirmation",
		content: (
			<>
				<p className="text-lg mt-2">
					This principle highlights the profound power of positive
					statements to shape a child's mindset, reinforce
					self-belief, and realign their identity with truth,
					especially when grounded in biblical principles. It's
					supported by neuroscience (neuroplasticity) and psychology
					(self-suggestion, cognitive bias), showing how consistent
					positive declarations strengthen neural pathways. Why it
					matters to you: The VDC Toolkit uses specially designed
					Affirmation Cards rooted in biblical truths. These cards
					help your child internalize their identity as loved,
					purposed, and uniquely created by God. By regularly
					affirming their inherent worth, spiritual attributes,
					character, and purpose, you counter harmful comparisons and
					build confidence, self-acceptance, and a strong,
					values-based identity.
				</p>
			</>
		),
	},
	{
		title: "Principle 4: The Operant Conditioning Principle",
		content: (
			<>
				<p className="text-lg mt-2">
					Based on the work of B.F. Skinner, this principle states
					that a behavior is strengthened or weakened based on the
					consequences that follows it. Positive behaviors are more
					likely to be repeated when followed by positive
					reinforcement, while negative behaviors decrease when
					followed by consequences. Why it matters to you: The VDC
					Toolkit applies this principle through its structured Affirm
					– Train – Track – Reward (ATTR) cycle. It moves beyond
					merely correcting misbehavior to proactively shaping
					character. Reward Cards are used for positive reinforcement,
					celebrating virtues like empathy and diligence, while
					Corrective Cards offer constructive feedback when
					improvement is needed. This consistent system promotes
					accountability, internalizes desired behaviors, and helps
					children understand that every behavior problem is
					fundamentally a values problem.
				</p>
			</>
		),
	},
	{
		title: "Principle 5: The Habit Loop Principle",
		content: (
			<>
				<p className="text-lg mt-2">
					Character isn’t built in a day—it’s built in daily routines.
					Rooted in Charles Duhigg's model, this principle explains
					that behaviors become automatic habits through a simple
					loop: Cue (trigger) → Routine (the behavior) → Reward
					(positive reinforcement). Consistent repetition turns
					conscious efforts into effortless, ingrained habits. The VDC
					Train-Up Cards are designed to leverage this principle. They
					act as the "cue" with specific daily practices forming the
					"routine". The Reward Cards provide the "reward" (points,
					praise, privileges) that releases dopamine, making the habit
					satisfying and strengthening its repetition and retention.
					This systematic approach helps your child develop lasting
					positive habits, transforming values from abstract ideas
					into daily lived behaviors with less conscious effort over
					time.
				</p>
			</>
		),
	},
	{
		title: "Principle 6: The Feedback Loop Principle",
		content: (
			<>
				<p className="text-lg mt-2">
					Growth needs tracking and managing. This principle
					emphasizes that continuously tracking, measuring, and
					evaluating behavior is essential for effective management
					and improvement. It involves observing a child's actions,
					tracking their progress, providing feedback, and adjusting
					guidance accordingly. Why it matters to you: No more
					parenting in the dark. You’ll see what’s working, where help
					is needed, and how to guide your child step by step. The VDC
					Toolkit transforms parenting from guesswork to strategic,
					data-driven nurturing. The Train-Up Cards, Star Reward
					Cards, Corrective Cards, and the My VDC Reward Chart work
					together to create a visible, measurable, and accountable
					system.
					<br />
					This allows you to:
				</p>
				<div className="pl-8">
					<ul className="list-disc">
						<li>Gain objective insight into behavior patterns.</li>
						<li>
							Provide targeted support and celebrate progress.
						</li>
						<li>
							Make adaptive adjustments to your parenting
							strategies based on clear data.
						</li>
						<li>
							Empower your child to take ownership of their growth
							and develop a strong sense of responsibility.
						</li>
					</ul>
				</div>
			</>
		),
	},
];

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

interface PrinciplesPageProps {
	isEmbedded?: boolean;
}

export const PrinciplesPage: React.FC<PrinciplesPageProps> = ({
	isEmbedded = false,
}) => {
	const [activePrincipleIndex, setActivePrincipleIndex] = React.useState(0);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	const headerContent = !isEmbedded ? (
		<>
			<motion.h1
				className="text-4xl md:text-5xl font-bold text-center mb-6"
				variants={itemVariants}>
				The VDC Toolkit Guiding Principles
			</motion.h1>
			<motion.p
				className="text-base md:text-xl text-center max-w-4xl mx-auto mb-16"
				variants={itemVariants}>
				At the heart of the Value Driven Child (VDC) Toolkit lies a
				robust framework built upon six interconnected guiding
				principles, providing a clear, structured, and adaptable roadmap
				for raising children of strong character.
			</motion.p>
		</>
	) : null;

	const desktopLayout = (
		<div className="flex flex-col md:flex-row gap-10 lg:gap-16">
			{/* Left Column: Principle Titles */}
			<motion.div className="w-full md:w-1/3" variants={itemVariants}>
				<div className="sticky top-24 space-y-4">
					{principles.map((principle, index) => (
						<div
							key={principle.title}
							onMouseEnter={() => setActivePrincipleIndex(index)}
							className={`cursor-pointer p-4 border-l-4 rounded-r-lg transition-all duration-300 ${
								activePrincipleIndex === index
									? "border-yellow-400 bg-teal-800/50 shadow-lg"
									: "border-teal-700 hover:bg-teal-800/30"
							}`}>
							<h3 className="font-bold text-lg text-yellow-100">
								{principle.title}
							</h3>
						</div>
					))}
				</div>
			</motion.div>

			{/* Right Column: Principle Content */}
			<motion.div className="w-full md:w-2/3" variants={itemVariants}>
				<div className="bg-teal-800/30 p-6 md:p-8 rounded-lg min-h-[34rem] shadow-inner">
					<AnimatePresence mode="wait">
						<motion.div
							key={activePrincipleIndex}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.3, ease: "easeOut" }}>
							<h2 className="text-3xl font-bold text-yellow-200 mb-4">
								{principles[activePrincipleIndex].title}
							</h2>
							<div>
								{principles[activePrincipleIndex].content}
							</div>
						</motion.div>
					</AnimatePresence>
				</div>
			</motion.div>
		</div>
	);

	const mobileLayout = (
		<div className="space-y-4 mt-12">
			{principles.map(principle => (
				<HoverCard key={principle.title}>
					<HoverCardTrigger asChild>
						<div className="cursor-pointer p-4 border-l-4 rounded-r-lg transition-all duration-300 border-teal-700 hover:bg-teal-800/30 bg-teal-800/50 shadow-lg">
							<h3 className="font-bold text-lg text-yellow-100">
								{principle.title}
							</h3>
						</div>
					</HoverCardTrigger>
					<HoverCardContent className="w-80 bg-teal-800 text-yellow-50 border-teal-700">
						<h2 className="text-xl font-bold text-yellow-200 mb-2">
							{principle.title}
						</h2>
						<div>{principle.content}</div>
					</HoverCardContent>
				</HoverCard>
			))}
		</div>
	);

	return (
		<div
			className={
				!isEmbedded ? "bg-teal-900 text-yellow-50 overflow-hidden" : ""
			}>
			<AnimatedSection className={!isEmbedded ? "py-20" : ""}>
				<div className="container mx-auto px-6">
					<motion.div
						className="max-w-6xl mx-auto"
						variants={containerVariants}
						initial="hidden"
						animate="visible">
						{headerContent}
						{isDesktop ? desktopLayout : mobileLayout}
					</motion.div>
				</div>
			</AnimatedSection>
		</div>
	);
};
