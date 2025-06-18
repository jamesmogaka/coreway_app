import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
	ShoppingCart,
	Star,
	Heart,
	BookOpen,
	Users,
	Gift,
	CheckCircle2,
} from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] 
    },
  },
};

// Main Page Component
const ProductsPage: React.FC = () => {
  return (
    <div className="bg-teal-900 min-h-screen text-yellow-50 p-4 sm:p-6 md:p-8">
      <motion.header 
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Products
        </motion.h1>
        <motion.p 
          className="text-base md:text-xl text-yellow-50"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: 0.1 }}
        >
          Tools for Raising Value-Driven Children
        </motion.p>
      </motion.header>

<motion.main 
        className="space-y-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        <motion.div variants={staggerContainer}>
          <ProductCategorySection
            title="Parenting Toolkits"
            description="Main character formation kits by age group."
          >
            <motion.div 
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={cardItem}><ToolkitCard1 /></motion.div>
              <motion.div variants={cardItem}><ToolkitCard2 /></motion.div>
            </motion.div>
          </ProductCategorySection>

          <ProductCategorySection
            title="Cards & Charts"
            description="Daily-use tools for training, correcting, and rewarding children.">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={cardItem}><TrainUpCards /></motion.div>
              <motion.div variants={cardItem}><CorrectiveCards /></motion.div>
              <motion.div variants={cardItem}><StarRewardCards /></motion.div>
              <motion.div variants={cardItem}><VdcRewardChart /></motion.div>
            </motion.div>
          </ProductCategorySection>

          <ProductCategorySection
            title="Tests & Guides"
            description="Assessments and personalized resources for value-based parenting.">
            <motion.div 
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={cardItem}><PredispositionTest /></motion.div>
              <motion.div variants={cardItem}><ParentingGuidebook /></motion.div>
            </motion.div>
          </ProductCategorySection>

          <ProductCategorySection
            title="Devotionals & Affirmations"
            description="Daily faith-based reinforcement tools.">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={cardItem}><AffirmationCards /></motion.div>
              <motion.div variants={cardItem}><ParentingDevotional /></motion.div>
              <motion.div variants={cardItem}><ReflectionJournal /></motion.div>
            </motion.div>
          </ProductCategorySection>

          <ProductCategorySection
            title="Training & Memberships"
            description="Extended support, learning, and community engagement.">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={cardItem}><OnlineCourse /></motion.div>
              <motion.div variants={cardItem}><CommunityMembership /></motion.div>
            </motion.div>
          </ProductCategorySection>

          <ProductCategorySection
            title="Gifts & Accessories"
            description="Meaningful and value-themed branded products.">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              <motion.div variants={cardItem}><ThemedMerch /></motion.div>
            </motion.div>
          </ProductCategorySection>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default ProductsPage;

// --- Helper Components for Layout and Detail Views ---

const ProductCategorySection: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ title, description, children }) => {
  return (
    <motion.section 
      className="space-y-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold text-yellow-50"
        variants={fadeInUp}
      >
        {title}
      </motion.h2>
      <motion.p 
        className="text-yellow-100 mb-6"
        variants={fadeInUp}
      >
        {description}
      </motion.p>
      {children}
    </motion.section>
  );
};

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({
	title,
	children,
}) => (
	<div className="mb-6">
		<h4 className="text-xl font-bold text-teal-600 mb-3">{title}</h4>
		{children}
	</div>
);

const FeatureListItem: React.FC<{
	children: React.ReactNode;
	citation?: number | number[];
}> = ({ children }) => (
	<li className="flex items-start gap-3 mb-2">
		<CheckCircle2 className="h-5 w-5 mt-1 text-teal-600 flex-shrink-0" />
		<span className="text-teal-800/90">{children}</span>
	</li>
);

// --- Individual Product Card Components with Integrated Dialogs ---

const ToolkitCard1: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<Badge className="bg-teal-600 text-white w-fit mb-2">
						Ages 4-9
					</Badge>
					<CardTitle className="text-2xl font-bold">
						Early Value Development Toolkit
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Start Early. Shape Character That Lasts.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="mb-4">
						This all-in-one parenting kit is crafted for ages 4 to 9
						, the most tender and teachable stage of development.
					</p>
					<div className="mb-4">
						<h4 className="font-semibold mb-2">Core Values:</h4>
						<div className="flex flex-wrap gap-1">
							{[
								"Obedience",
								"Respect",
								"Empathy",
								"Diligence",
								"Gratitude",
								"Cooperation",
								"Honesty",
								"Patience",
							].map(value => (
								<Badge
									key={value}
									variant="secondary"
									className="bg-teal-200 text-teal-800">
									{value}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 79.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-3xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<Badge className="bg-teal-600 text-white w-fit mb-2">
					Ages 4-9
				</Badge>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Early Value Development Toolkit
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Start Early. Shape Character That Lasts.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
				<div className="md:col-span-2">
					<p>
						The early years are sacred—when your child’s heart is
						open, their habits are forming, and their worldview is
						being written. With daily, easy-to-use tools and
						biblically grounded guidance, you'll naturally weave
						values like Respect, Honesty, Patience, Gratitude, and
						more into your child's everyday routines— without
						lectures, battles, or burnout.{" "}
					</p>
				</div>
				<div>
					<DetailSection title="Why Parents Love This Toolkit ">
						<ul className="space-y-2">
							<FeatureListItem>
								Teaches values in everyday life—not just rules{" "}
							</FeatureListItem>
							<FeatureListItem>
								Builds spiritual, emotional & behavioral growth
								through daily habits{" "}
							</FeatureListItem>
							<FeatureListItem>
								Includes visual, interactive tools that make
								parenting easier{" "}
							</FeatureListItem>
							<FeatureListItem>
								Rooted in timeless Scripture-based principles{" "}
							</FeatureListItem>
							<FeatureListItem>
								Blends structure with play for effortless
								learning{" "}
							</FeatureListItem>
							<FeatureListItem>
								Designed for modern, intentional parents{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
					<DetailSection title="Core Values Cultivated ">
						<div className="flex flex-wrap gap-2">
							{[
								"Obedience",
								"Respect",
								"Empathy",
								"Diligence",
								"Gratitude",
								"Cooperation",
								"Honesty",
								"Patience",
								"Courage",
								"Godliness",
								"Creativity",
							].map(value => (
								<Badge
									key={value}
									className="bg-teal-200 text-teal-800">
									{value}
								</Badge>
							))}
						</div>
					</DetailSection>
				</div>
				<div>
					<DetailSection title="What’s Inside the Box? ">
						<p className="mb-3 text-sm text-teal-800/80">
							Everything you need for a full year of intentional
							parenting:{" "}
						</p>
						<ul className="space-y-2">
							<FeatureListItem>
								48 Train-Up Cards – Daily practices + simple
								parent guides{" "}
							</FeatureListItem>
							<FeatureListItem>
								48 Corrective Cards – For redirection &
								reflection, not shame{" "}
							</FeatureListItem>
							<FeatureListItem>
								48 Reward Cards – Star-based motivation with
								meaningful rewards{" "}
							</FeatureListItem>
							<FeatureListItem>
								4 My VDC Reward Charts – Visual tracking to
								build confidence{" "}
							</FeatureListItem>
							<FeatureListItem>
								15 Affirmation Cards – Reinforce identity and
								heart-based learning{" "}
							</FeatureListItem>
							<FeatureListItem>
								Value-Driven Parenting Guide – Step-by-step
								onboarding + usage{" "}
							</FeatureListItem>
							<FeatureListItem>
								Child Predisposition Test – Discover your
								child’s natural strengths and learning style{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
				</div>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 79.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const ToolkitCard2: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<Badge className="bg-teal-600 text-white w-fit mb-2">
						Ages 10-18
					</Badge>
					<CardTitle className="text-2xl font-bold">
						Transitional Values Development Toolkit
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Empower teens with values that shape purpose,
						confidence, and leadership – for life.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p className="mb-4">
						This toolkit is designed to support parents in guiding
						their 10–18-year-olds through this critical stage of
						maturity using a structured, values-based approach
						rooted in timeless biblical principles.{" "}
					</p>
					<div className="mb-4">
						<h4 className="font-semibold mb-2">Focuses On:</h4>
						<div className="flex flex-wrap gap-1">
							{[
								"Integrity",
								"Time Management",
								"Work Attitude",
								"Creativity & Problem-Solving",
								"Servant Leadership",
							].map(value => (
								<Badge
									key={value}
									variant="secondary"
									className="bg-teal-200 text-teal-800">
									{value}
								</Badge>
							))}
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 89.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-3xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<Badge className="bg-teal-600 text-white w-fit mb-2">
					Ages 10-18
				</Badge>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Transitional Values Development Toolkit
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Empower teens with values that shape purpose, confidence,
					and leadership – for life.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
				<div className="md:col-span-2">
					<p>
						Adolescence is where character meets choices. This
						toolkit equips teens to build the character they need to
						thrive in the real world—at school, at home, and in
						society. It focuses on 12 transformative values,
						including Integrity, Time Management, Work Attitude,
						Creativity & Problem-Solving, and Servant Leadership.{" "}
					</p>
				</div>
				<div>
					<DetailSection title="Designed for Parents Who Want to: ">
						<ul className="space-y-2">
							<FeatureListItem>
								Raise emotionally intelligent, spiritually
								anchored teens{" "}
							</FeatureListItem>
							<FeatureListItem>
								Provide structured support without controlling
								or nagging{" "}
							</FeatureListItem>
							<FeatureListItem>
								Replace conflict with clear expectations and
								conversations{" "}
							</FeatureListItem>
							<FeatureListItem>
								Foster discipline that matures into
								self-leadership{" "}
							</FeatureListItem>
							<FeatureListItem>
								Equip teens to navigate peer pressure, laziness,
								and distraction with wisdom and grace{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
					<DetailSection title="Values That Build Lifelong Impact ">
						<div className="flex flex-wrap gap-2">
							{[
								"Integrity",
								"Time Management",
								"Obedience",
								"Diligence",
								"Work Attitude",
								"Personal Grooming & Orderliness",
								"Creativity, Problem Solving & Critical Thinking",
								"Teamwork",
								"Servant Leadership",
								"Gratitude",
								"Benevolence",
								"Godliness",
							].map(value => (
								<Badge
									key={value}
									className="bg-teal-200 text-teal-800">
									{value}
								</Badge>
							))}
						</div>
						<p className="text-sm text-teal-800/80 mt-3">
							These 12 values are strategic and foundational. When
							consistently nurtured, they naturally lead to the
							development of dozens of other virtues like
							perseverance, empathy, discernment, humility, and
							resilience.{" "}
						</p>
					</DetailSection>
				</div>
				<div>
					<DetailSection title="What’s Inside the Box: ">
						<p className="mb-3 text-sm text-teal-800/80">
							Everything you need to coach your teen through a
							full year of values-based growth:{" "}
						</p>
						<ul className="space-y-2">
							<FeatureListItem>
								48 Train-Up Cards – Weekly practices & prompts
								for real-life value application{" "}
							</FeatureListItem>
							<FeatureListItem>
								48 Corrective Cards – Gentle reflection tools
								for when things go wrong{" "}
							</FeatureListItem>
							<FeatureListItem>
								48 Reward Cards – Star-based incentives that
								build motivation & consistency{" "}
							</FeatureListItem>
							<FeatureListItem>
								4 VDC Reward Charts – Visual goal-setting and
								confidence tracking{" "}
							</FeatureListItem>
							<FeatureListItem>
								15 Affirmation Cards – To strengthen identity
								and heart-based conviction{" "}
							</FeatureListItem>
							<FeatureListItem>
								Parenting Guidebook – Clear instructions for how
								to lead, track, and reward{" "}
							</FeatureListItem>
							<FeatureListItem>
								Child Predisposition Quiz – Understand how your
								teen is wired (and how to parent accordingly){" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
				</div>
				<div className="md:col-span-2">
					<blockquote className="border-l-4 border-teal-800 pl-4 italic text-teal-800">
						“This toolkit gave our family a way to talk about values
						without turning every mistake into a lecture. It helped
						us raise a teen who actually wants to lead themselves.”—
						A VDC Parent{" "}
					</blockquote>
				</div>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 89.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const TrainUpCards: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Train-Up Cards
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Transform everyday moments into powerful lessons in
						character.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						The heart of the VDC Toolkit, these daily-use cards help
						children and teens embody values through small,
						consistent actions.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 19.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-2xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Train-Up Cards (Set of 12 per Age Group){" "}
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Transform everyday moments into powerful lessons in
					character.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					Each card focuses on one core value, offering a simple
					definition, a set of realistic daily practices, and
					Bible-based reinforcements that make the value come alive.
					They guide children through a clear, rewardable process:
					practicing the value, tracking their efforts, and connecting
					their growth to spiritual truths.{" "}
				</p>
				<DetailSection title="Each Card Includes: ">
					<ul className="space-y-2">
						<FeatureListItem>
							Simple and age-appropriate definition of the value{" "}
						</FeatureListItem>
						<FeatureListItem>
							3–4 daily action steps children can apply
							immediately{" "}
						</FeatureListItem>
						<FeatureListItem>
							Reflection questions (for teens){" "}
						</FeatureListItem>
						<FeatureListItem>
							Scripture reinforcement to root the value in faith{" "}
						</FeatureListItem>
						<FeatureListItem>
							Point system to track growth and earn rewards{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Available Sets:">
					<ul className="list-disc list-inside text-teal-800/90">
						<li>
							Ages 4–9: Foundational values like Respect, Honesty,
							Patience{" "}
						</li>
						<li>
							Ages 10–18: Transitional values like Integrity,
							Diligence, and Servant Leadership{" "}
						</li>
					</ul>
				</DetailSection>
				<DetailSection title="Format ">
					<p>
						Full-color printed card set or digital download
						(printable at home).{" "}
					</p>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 19.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const CorrectiveCards: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Corrective Cards
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Turn missteps into milestones with grace-filled
						correction.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						A firm yet nurturing tool to help children and teens
						take responsibility for their actions and grow from
						their mistakes.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 19.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-2xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Corrective Cards (Set of 12){" "}
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Turn missteps into milestones with grace-filled correction.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					Designed to encourage accountability without shame , these
					cards create calm, respectful discipline moments that build
					maturity, spiritual awareness, and trust between parent and
					child. Rooted in the ATTR approach
					(Affirm–Train–Track–Reward), each card guides the child
					through a structured correction process.{" "}
				</p>
				<DetailSection title="Each Card Includes: ">
					<ul className="space-y-2">
						<FeatureListItem>
							Reason for correction (linked to value missed){" "}
						</FeatureListItem>
						<FeatureListItem>
							Impact of behavior (short and long-term){" "}
						</FeatureListItem>
						<FeatureListItem>
							3-Tiered Consequences: from warning to contract{" "}
						</FeatureListItem>
						<FeatureListItem>
							Reflection questions (child-led and
							parent-supported){" "}
						</FeatureListItem>
						<FeatureListItem>
							Scripture-based reinforcement{" "}
						</FeatureListItem>
						<FeatureListItem>
							Commitment section for behavioral change{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Set Covers Values For: ">
					<ul className="list-disc list-inside text-teal-800/90">
						<li>
							Ages 4–9: Foundational values like Respect, Honesty,
							Patience{" "}
						</li>
						<li>
							Ages 10–18: Transitional values like Integrity,
							Diligence, and Servant Leadership{" "}
						</li>
					</ul>
				</DetailSection>
				<DetailSection title="Format ">
					<p>
						Durable printed card set (boxed) or printable PDF for
						flexible use at home or school.{" "}
					</p>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 19.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const StarRewardCards: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Star Reward Cards
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Celebrate character, not just performance.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						Powerful affirmation tools designed to reinforce
						value-driven behavior in children and teens.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 14.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-2xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Star Reward Cards (Set of 24){" "}
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Celebrate character, not just performance.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					These cards go beyond generic praise by highlighting the
					exact value exhibited, helping children connect their
					actions to deeper character development. Whether you're
					using them to celebrate a consistent week of effort or a
					courageous act in a tough moment, these collectible cards
					become lasting reminders that living with values is worth
					it.{" "}
				</p>
				<DetailSection title="Why They Work ">
					<ul className="space-y-2">
						<FeatureListItem>
							Helps children and teens see the value behind their
							actions{" "}
						</FeatureListItem>
						<FeatureListItem>
							Builds internal motivation and positive self-concept{" "}
						</FeatureListItem>
						<FeatureListItem>
							Reinforces the practice → reward → reflection cycle{" "}
						</FeatureListItem>
						<FeatureListItem>
							Strengthens parent-child relationships through
							shared language and affirmation{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Set Includes 24 Cards Covering Values Like: ">
					<div className="flex flex-wrap gap-2">
						{[
							"Respect",
							"Honesty",
							"Gratitude",
							"Courage",
							"Integrity",
							"Teamwork",
							"Creativity",
							"Godliness",
							"Patience",
							"Obedience",
							"Diligence",
							"Responsibility",
						].map(value => (
							<Badge
								key={value}
								className="bg-teal-200 text-teal-800">
								{value}
							</Badge>
						))}
					</div>
				</DetailSection>
				<DetailSection title="Format ">
					<p>
						Pre-printed card pack (full-color, high-quality
						cardstock).{" "}
					</p>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 14.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const VdcRewardChart: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						My VDC Reward Chart
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Track the invisible. Celebrate the progress.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						A powerful parenting tool designed to make character
						growth visible. Grounded in the Feedback Loop Principle.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 9.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-2xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					My VDC Reward Chart
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Track the invisible. Celebrate the progress. Build
					value-driven habits.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					This chart gives both children and parents a clear,
					structured way to observe how small, consistent daily
					practices build up over time into strong, godly character.
					This supports the Habit Loop Principle, which transforms
					values from mere ideas into repeated, rewarding actions.{" "}
				</p>
				<DetailSection title="Why It Works: ">
					<ul className="space-y-2">
						<FeatureListItem>
							Helps children see their progress and own their
							growth{" "}
						</FeatureListItem>
						<FeatureListItem>
							Encourages daily repetition, which strengthens value
							retention{" "}
						</FeatureListItem>
						<FeatureListItem>
							Builds motivation through visual success markers{" "}
						</FeatureListItem>
						<FeatureListItem>
							Promotes healthy accountability between parent and
							child{" "}
						</FeatureListItem>
						<FeatureListItem>
							Connects short-term effort to long-term
							transformation{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Features Include: ">
					<ul className="space-y-2">
						<FeatureListItem>
							Daily Tracker – Log value-based actions aligned with
							Train-up Card practices{" "}
						</FeatureListItem>
						<FeatureListItem>
							Weekly Reflection Section – Tally stars, celebrate
							consistency, and write encouragements{" "}
						</FeatureListItem>
						<FeatureListItem>
							8-Week Growth Overview – See long-term patterns
							across values and weeks{" "}
						</FeatureListItem>
						<FeatureListItem>
							Reusable Design – Works as a laminated chart or
							printable PDF for repeated use{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Format ">
					<p>
						Printable PDF Kit – Includes weekly and 8-week charts,
						value icons, star templates, and setup guide.{" "}
					</p>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 9.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<Star className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const PredispositionTest: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						VDC Child Predispositions Test
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Understand Your Child’s Wiring. Parent with Purpose.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						This isn’t just a personality quiz—it’s the foundation
						of Exclusive Parenting , a core pillar of the VDC
						approach.
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 24.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-3xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					VDC Child Predispositions Test (Colour Predisposition Quiz){" "}
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Understand Your Child’s Wiring. Parent with Purpose.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
				<div className="md:col-span-2">
					<p>
						Every child is born with a unique internal design—a
						built-in compass for how they feel, think, learn, and
						grow. The VDC Child Predispositions Test helps you
						decode that design by identifying your child’s dominant
						Color Predisposition: Blue, Gold, Green, or Orange.
						Through 25 real-life, behavior-based scenarios you’ll
						uncover the natural traits that guide your child’s
						emotions, decisions, and needs.{" "}
					</p>
				</div>
				<div>
					<DetailSection title="What You'll Gain: ">
						<ul className="space-y-2">
							<FeatureListItem>
								A deeper understanding of your child’s natural
								wiring{" "}
							</FeatureListItem>
							<FeatureListItem>
								Personalized tools for teaching values and
								correcting with compassion{" "}
							</FeatureListItem>
							<FeatureListItem>
								Greater connection, fewer misunderstandings{" "}
							</FeatureListItem>
							<FeatureListItem>
								A confident path forward in using the full VDC
								Toolkit effectively{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
					<DetailSection title="Exclusive Parenting at a Glance: ">
						<ul className="space-y-2 text-teal-800/90">
							<li>
								<span className="font-bold text-blue-500">
									Blue
								</span>{" "}
								– Needs connection, empathy & emotional safety{" "}
							</li>
							<li>
								<span className="font-bold text-yellow-500">
									Gold
								</span>{" "}
								– Thrives on structure, rules & clear
								expectations{" "}
							</li>
							<li>
								<span className="font-bold text-green-500">
									Green
								</span>{" "}
								– Seeks logic, depth & respectful independence{" "}
							</li>
							<li>
								<span className="font-bold text-orange-500">
									Orange
								</span>{" "}
								– Craves excitement, movement & experiential
								learning{" "}
							</li>
						</ul>
					</DetailSection>
				</div>
				<div>
					<DetailSection title="What’s Inside: ">
						<ul className="space-y-2">
							<FeatureListItem>
								25-scenario assessment (easy to complete in
								under 15 minutes){" "}
							</FeatureListItem>
							<FeatureListItem>
								Color-coded scoring system (Blue · Gold · Green
								· Orange){" "}
							</FeatureListItem>
							<FeatureListItem>
								Temperament Breakdown — reveals strengths,
								struggles, and key needs{" "}
							</FeatureListItem>
							<FeatureListItem>
								Exclusive Parenting Guide — strategies for
								communication, correction, motivation &
								affirmation{" "}
							</FeatureListItem>
							<FeatureListItem>
								Fillable PDF or Online Version — track
								responses, score instantly, and begin parenting
								with clarity{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
					<blockquote className="border-l-4 border-[#129990] pl-4 italic text-teal-800 mt-6">
						“This quiz changed the way I speak to my son. I finally
						understood why he needs structure—and how to offer it
						without power struggles. A total game-changer.”– A VDC
						Parent{" "}
					</blockquote>
				</div>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 24.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<BookOpen className="mr-2 h-5 w-5" /> Take the Quiz
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const ParentingGuidebook: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						The VDC Parenting Guidebook
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Raise children of character with a parenting approach
						tailored to their design.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						This manual is the cornerstone of the Value Driven Child
						(VDC) system—a strategic, biblical, and psychologically
						sound parenting model.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 29.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-3xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					The VDC Parenting Guidebook
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Raise children of character with a parenting approach
					tailored to their design.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
				<div className="md:col-span-2">
					<p>
						Built around the signature VDC ATTR Cycle (Affirm –
						Train – Track – Reward), this guidebook offers a
						complete roadmap to intentional and exclusive
						parenting—the practice of nurturing each child according
						to their God-given color predisposition. From
						foundational values like Respect and Obedience, to
						transitional strengths like Integrity, Creativity, and
						Servant Leadership, every value is brought to life with
						age-appropriate tools, biblical wisdom, and real-life
						application.{" "}
					</p>
				</div>
				<div>
					<DetailSection title="What Sets This Guidebook Apart ">
						<ul className="space-y-3">
							<li>
								<strong className="text-teal-600">
									VDC Principles:
								</strong>{" "}
								The 6 Pillars of VDC Parenting, rooted in both
								Scripture and psychology.{" "}
							</li>
							<li>
								<strong className="text-teal-600">
									Parenting by Values, Not Control:
								</strong>{" "}
								Build self-leadership, responsibility, and
								conviction from the inside out.{" "}
							</li>
							<li>
								<strong className="text-teal-600">
									12 Core Values = 200+ Virtues:
								</strong>{" "}
								Using the Pareto Principle, this guide reveals
								how focusing on just 12 essential values can
								organically lead to over 200 positive behaviors
								and character traits.{" "}
							</li>
							<li>
								<strong className="text-teal-600">
									Misbehavior Is a Clue:
								</strong>{" "}
								Most missteps point to a missing value—not a
								broken child. The built-in
								Misbehavior-to-Missing-Value Map helps you
								decode what’s really going on.{" "}
							</li>
							<li>
								<strong className="text-teal-600">
									Parenting is a Sacred Assignment:
								</strong>{" "}
								This guide calls you back to the heart of
								parenting: discipling a soul for God’s purpose.{" "}
							</li>
						</ul>
					</DetailSection>
				</div>
				<div>
					<DetailSection title="What’s Inside: ">
						<ul className="space-y-2">
							<FeatureListItem>
								A full breakdown of 24 core values for ages 4–18{" "}
							</FeatureListItem>
							<FeatureListItem>
								The complete ATTR Parenting Model
								(Affirm–Train–Track–Reward){" "}
							</FeatureListItem>
							<FeatureListItem>
								Exclusive parenting strategies by predisposition
								color{" "}
							</FeatureListItem>
							<FeatureListItem>
								A guide to using Train-Up, Reward, and
								Corrective Cards effectively{" "}
							</FeatureListItem>
							<FeatureListItem>
								Spirit-led discipline through value
								correction—not shame{" "}
							</FeatureListItem>
							<FeatureListItem>
								Scripture-based reinforcement through prayer,
								reflection & discussion{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
					<blockquote className="border-l-4 border-teal-800 pl-4 italic text-teal-800 mt-6">
						“This book gave us structure we could trust, and
						spiritual confidence we didn’t know we needed. We
						stopped reacting—and started parenting with purpose.”— A
						VDC Parent{" "}
					</blockquote>
				</div>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 29.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const AffirmationCards: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Daily Affirmation Cards
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Affirm who your child is becoming—with words rooted in
						God’s truth.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						Spirit-led declarations grounded in Scripture, designed
						to shape your child’s identity, values, and destiny.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 19.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-2xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Daily Affirmation Cards
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Affirm who your child is becoming—with words rooted in God’s
					truth.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					These are not casual compliments or generic feel-good
					quotes—they are spirit-led declarations grounded in
					Scripture , designed to shape your child’s identity, values,
					and destiny according to how God sees them. They are a
					foundational tool in the Affirm stage of the ATTR Cycle
					(Affirm–Train–Track–Reward).{" "}
				</p>
				<DetailSection title="Why They Matter ">
					<ul className="space-y-2">
						<FeatureListItem>
							Builds Spiritual Identity: Helps children
							internalize who God says they are, even before they
							fully become it{" "}
						</FeatureListItem>
						<FeatureListItem>
							Builds emotional stability and moral courage through
							consistent truth{" "}
						</FeatureListItem>
						<FeatureListItem>
							Strengthens family spiritual culture when used as a
							shared daily practice{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="What You’ll Find Inside ">
					<ul className="space-y-2">
						<FeatureListItem>
							Identity-shaping affirmations, rooted in biblical
							truth{" "}
						</FeatureListItem>
						<FeatureListItem>
							Daily declarations across four categories: Identity
							& Relationship with God, Spiritual Strength,
							Character & Moral Values, Purpose & Calling{" "}
						</FeatureListItem>
						<FeatureListItem>
							Scripture references for every affirmation, to
							anchor truth in God’s Word{" "}
						</FeatureListItem>
						<FeatureListItem>
							Usage guide for integrating affirmations into
							morning routines, bedtime, devotions, and correction
							moments{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Format Options ">
					<p>
						Premium Card Deck – beautifully printed, keepsake
						quality, ideal for home, school, journaling or great for
						gifting.{" "}
					</p>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 19.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<Heart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const ParentingDevotional: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Parenting Devotional
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						For Intentional Moms & Dads.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						A 30-day journey of spiritual renewal, scriptural
						reflection, and practical encouragement to anchor your
						parenting in God’s truth.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 17.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-2xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Parenting Devotional for Intentional Moms & Dads
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Grow your parenting from the inside out—with truth, grace,
					and spiritual focus.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					Each devotional draws from the core values of the VDC
					Framework , connecting character-building in your children
					to spiritual growth in your own heart. Topics mirror the
					same values you’re building in your child—because the truth
					is, we can’t give what we haven’t first received ourselves.{" "}
				</p>
				<DetailSection title="What Makes It Unique: ">
					<ul className="space-y-2">
						<FeatureListItem>
							Built around the VDC Values – Each day explores a
							value such as Diligence, Gratitude, or Integrity
							through the lens of parenting.{" "}
						</FeatureListItem>
						<FeatureListItem>
							Reinforces the VDC Principles – Especially supports
							the Affirmation Principle and the role of parents as
							spiritual nurturers.{" "}
						</FeatureListItem>
						<FeatureListItem>
							Practical & Reflective – Combines biblical insight
							with everyday examples, personal growth, and prompts
							to engage your child.{" "}
						</FeatureListItem>
						<FeatureListItem>
							Encourages Unity – Can be used by couples, small
							groups, or individual parents on their own journey.{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Daily Format Includes: ">
					<ul className="space-y-2">
						<FeatureListItem>Core Scripture </FeatureListItem>
						<FeatureListItem>
							Devotional Reflection{" "}
						</FeatureListItem>
						<FeatureListItem>Guided Prayer </FeatureListItem>
						<FeatureListItem>VDC Parenting Prompt </FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="Format Options ">
					<p>Printable PDF eDevotional or a Softcover Booklet. </p>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 17.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<BookOpen className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const ReflectionJournal: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Parent–Child Reflection Journal
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Grow together. Reflect deeply.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						A 12-week guided journal that creates space for
						meaningful conversations, spiritual connection, and
						shared growth.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 22.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-2xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Parent–Child Reflection Journal
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Strengthen the bond that shapes a lifetime.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					Each weekly section is based on the ATTR Cycle
					(Affirm–Train–Track–Reward) , allowing both parent and child
					to reflect on how they are living out values like patience,
					integrity, diligence, gratitude etc. It’s more than a
					journal—it’s a relationship builder, a mirror for growth,
					and a tool to anchor values into the heart through
					thoughtful conversation.{" "}
				</p>
				<DetailSection title="What Makes It Special:">
					<ul className="space-y-2">
						<FeatureListItem>
							Dual-Voice Design: Prompts for both parent and
							child.{" "}
						</FeatureListItem>
						<FeatureListItem>
							Built Around Values: Weekly reflections align with
							VDC core values.{" "}
						</FeatureListItem>
						<FeatureListItem>
							Supports the Feedback Loop Principle: Track what’s
							working, celebrate progress, and identify areas for
							growth together.{" "}
						</FeatureListItem>
						<FeatureListItem>
							Emotionally Safe Format: Questions invite
							connection, not correction.{" "}
						</FeatureListItem>
						<FeatureListItem>
							Spiritually Anchored: Scripture space and prayer
							prompts keep God at the center.{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
				<DetailSection title="What’s Inside: ">
					<ul className="space-y-2">
						<FeatureListItem>
							12 Weeks of Guided Reflections{" "}
						</FeatureListItem>
						<FeatureListItem>
							Weekly Themes based on foundational values (e.g.,
							Obedience, Honesty, Courage){" "}
						</FeatureListItem>
						<FeatureListItem>
							"High & Low Moments" Space for real conversation{" "}
						</FeatureListItem>
						<FeatureListItem>
							Joint Prayer Prompt & Verse of the Week{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">KSh 22.99</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<Heart className="mr-2 h-5 w-5" /> Add to Cart
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const OnlineCourse: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Complete Online Parenting Course
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Parent with vision, confidence, and biblical
						clarity—guided every step of the way.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						An interactive course that walks you step-by-step
						through the VDC Parenting Framework, including its 6
						core principles and 22 foundational values.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 299.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-3xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Complete Online Parenting Course (Instructor-Led – VDC
					Toolkit Based){" "}
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Parent with vision, confidence, and biblical clarity—guided
					every step of the way.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
				<div className="md:col-span-2">
					<p>
						This interactive course walks you step-by-step through
						the VDC Parenting Framework, including its 6 core
						principles, the 22 foundational values, and the
						exclusive approach to parenting based on your child’s
						natural predisposition. Each session is designed to
						bring real change—not just to your children, but to you
						as a parent—through live teaching, reflection, Q&A, and
						practical assignments.{" "}
					</p>
				</div>
				<div>
					<DetailSection title="What Makes This Course Transformational: ">
						<ul className="space-y-2">
							<FeatureListItem>
								Instructor-Led Guidance – Live facilitation by
								certified VDC coaches or founders{" "}
							</FeatureListItem>
							<FeatureListItem>
								Structured Weekly Sessions – Interactive Zoom
								calls with guided instruction{" "}
							</FeatureListItem>
							<FeatureListItem>
								Personalized Application – Learn to apply the
								VDC Toolkit to your unique family{" "}
							</FeatureListItem>
							<FeatureListItem>
								Faith-Centered Focus – Every session is rooted
								in Scripture{" "}
							</FeatureListItem>
							<FeatureListItem>
								Supportive Community – Learn alongside other
								parents{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
					<DetailSection title="Course Modules: ">
						<ul className="list-decimal list-inside text-teal-800/90">
							<li>
								Module 1: Conventional Parenting & The VDC
								Solution{" "}
							</li>
							<li>
								Module 2: Understanding the 6 VDC Principles{" "}
							</li>
							<li>
								Module 3: Using the ATTR Cycle – Affirm, Train,
								Track, Reward{" "}
							</li>
							<li>
								Module 4: Color Predisposition Parenting – Blue,
								Gold, Green & Orange{" "}
							</li>
							<li>
								Module 5: Applying the Toolkit: Train-up Cards,
								Reward Charts, Corrective Cards{" "}
							</li>
							<li>
								Module 6: Consequences & Discipline with Grace{" "}
							</li>
							<li>
								Module 7: Spiritual Reinforcement & Daily
								Integration{" "}
							</li>
							<li>
								Module 8: Building Long-Term Value Culture in
								Your Home{" "}
							</li>
						</ul>
					</DetailSection>
				</div>
				<div>
					<DetailSection title="What’s Included: ">
						<ul className="space-y-2">
							<FeatureListItem>
								8 Weeks – 1 live session per week (2 Hours){" "}
							</FeatureListItem>
							<FeatureListItem>
								Live Zoom Instruction & Q&A{" "}
							</FeatureListItem>
							<FeatureListItem>
								Printed VDC Parenting Workbook{" "}
							</FeatureListItem>
							<FeatureListItem>
								24 Value Overviews with action steps{" "}
							</FeatureListItem>
							<FeatureListItem>
								Color Predisposition Summary Sheets{" "}
							</FeatureListItem>
							<FeatureListItem>
								Parenting Growth Journal{" "}
							</FeatureListItem>
							<FeatureListItem>
								Bonus Access to community discussion group{" "}
							</FeatureListItem>
						</ul>
					</DetailSection>
				</div>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">
					KSh 299.99
				</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<Users className="mr-2 h-5 w-5" /> Enroll Now
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const CommunityMembership: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						VDC Community Membership
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Join a values-driven parenting community.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						Get monthly content, downloadable value packs, group
						coaching calls, and access to new VDC tools.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-2xl font-bold text-teal-800">
						KSh 14.99/mo
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					VDC Community Membership
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Join a values-driven parenting community.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					Receive ongoing support and encouragement on your parenting
					journey. This membership ensures you always have fresh
					resources and a community to lean on.
				</p>
				<DetailSection title="Membership Benefits: ">
					<ul className="space-y-2">
						<FeatureListItem>
							Monthly value-themed parenting pack{" "}
						</FeatureListItem>
						<FeatureListItem>
							Group mentorship & Q&A forums{" "}
						</FeatureListItem>
						<FeatureListItem>
							Access to new VDC tools{" "}
						</FeatureListItem>
						<FeatureListItem>
							Ideal for ongoing growth and encouragement{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-3xl font-bold text-teal-800">
					KSh 14.99/mo
				</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<Users className="mr-2 h-5 w-5" /> Join Now
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

const ThemedMerch: React.FC = () => (
	<Dialog>
		<DialogTrigger asChild>
			<Card className="bg-yellow-50 text-teal-800 border-teal-200 flex flex-col cursor-pointer hover:shadow-lg hover:ring-2 hover:ring-teal-200 transition-all duration-300">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">
						Value-Themed Gifts & Accessories
					</CardTitle>
					<CardDescription className="text-teal-800/80">
						Meaningful and value-themed branded products.{" "}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex-grow">
					<p>
						Branded gear featuring encouraging scriptures, values
						quotes, and affirming messages.{" "}
					</p>
				</CardContent>
				<CardFooter className="flex justify-between items-center bg-teal-800/5 rounded-b-lg p-4 mt-auto">
					<span className="text-xl font-bold text-teal-800">
						From KSh 12.99
					</span>
					<Button variant="link" className="text-teal-600">
						View Details
					</Button>
				</CardFooter>
			</Card>
		</DialogTrigger>
		<DialogContent className="bg-yellow-50 text-teal-800 sm:max-w-xl max-h-[90vh] flex flex-col">
			<DialogHeader>
				<DialogTitle className="text-3xl font-bold text-teal-800">
					Value-Themed T-Shirts, Mugs & Posters
				</DialogTitle>
				<DialogDescription className="text-teal-800/80 text-md">
					Meaningful and value-themed branded products.{" "}
				</DialogDescription>
			</DialogHeader>
			<div className="overflow-y-auto pr-4 -mr-4 py-4">
				<p className="mb-4">
					Ideal as gifts or family bonding props, our accessories
					feature encouraging scriptures, values quotes, and affirming
					messages.{" "}
				</p>
				<DetailSection title="Product Line: ">
					<ul className="space-y-2">
						<FeatureListItem>
							<strong>T-Shirts:</strong> “Raising a Value Driven
							Child”{" "}
						</FeatureListItem>
						<FeatureListItem>
							<strong>Mugs:</strong> “Integrity Begins at Home”{" "}
						</FeatureListItem>
						<FeatureListItem>
							<strong>Posters:</strong> Affirmations and ATTR
							cycle graphics{" "}
						</FeatureListItem>
					</ul>
				</DetailSection>
			</div>
			<DialogFooter className="flex sm:justify-between items-center border-t border-teal-200/50 pt-4 mt-auto">
				<span className="text-2xl font-bold text-teal-800">
					From KSh 12.99
				</span>
				<Button
					size="lg"
					className="bg-teal-600 hover:bg-teal-600/90 text-white">
					<Gift className="mr-2 h-5 w-5" /> Shop Gifts
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);
