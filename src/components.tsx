import React, { useState } from "react";

import * as react from "react";
// --- Type Definitions ---

export interface Value {
	description: string;
	importance: string;
	lacking: string;
}

interface ValueData {
	[key: string]: Value;
}

interface Predisposition {
	title: string;
	header: string;
	description: string;
	parenting: string;
}

interface Predispositions {
	[key: string]: Predisposition;
}

// --- Data for the Toolkit ---
const kit1Data: ValueData = {
	Respect: {
		description:
			"Forms the cornerstone of how individuals treat themselves and others, teaching the importance of understanding and appreciating diversity and inherent worth.",
		importance:
			"Fosters positive social interactions, empathy, and a harmonious environment.",
		lacking:
			"Disrespectful behavior towards authority, rudeness, talking back, and a lack of consideration for others' feelings.",
	},
	Responsibility: {
		description:
			"Instills accountability for one's actions, possessions, and commitments.",
		importance:
			"Builds reliability, trustworthiness, and conscientiousness, which are crucial for personal and academic success.",
		lacking:
			"Not completing tasks, blaming others for mistakes, being disorganized, and failing to care for personal belongings.",
	},
	Cooperation: {
		description: "Encourages teamwork, collaboration, and social harmony.",
		importance:
			"Promotes empathy, effective communication, and the ability to work towards shared goals, essential skills for school and life.",
		lacking:
			"Inability to share or work in a team, frequent arguments with peers, and a refusal to compromise.",
	},
	Empathy: {
		description:
			"Nurtures compassion, understanding, and emotional intelligence.",
		importance:
			"Enables children to build meaningful relationships and navigate social situations with kindness and sensitivity.",
		lacking:
			"Being unkind to siblings or peers, lack of concern for others' feelings, and difficulty seeing situations from another's perspective.",
	},
	Honesty: {
		description:
			"Fosters integrity, authenticity, and trustworthiness in all actions and words.",
		importance:
			"Builds a foundation of trust with parents, teachers, and peers, which is essential for strong relationships.",
		lacking:
			"Lying or hiding the truth, cheating in games or schoolwork, and stealing.",
	},
	Patience: {
		description:
			"Cultivates self-control, resilience, and perseverance, especially in challenging situations.",
		importance:
			"Equips children to handle frustration, delay gratification, and overcome obstacles with composure.",
		lacking:
			"Giving up easily after a failure, frequent tantrums, and an inability to wait for their turn.",
	},
	Courage: {
		description:
			"Instills bravery, confidence, and the resilience to face fears and take appropriate risks.",
		importance:
			"Empowers children to stand up for their beliefs and to try new things, even when they are afraid.",
		lacking:
			"Withdrawing from new experiences, fear of speaking up, and an inability to stand up for what is right.",
	},
	Gratitude: {
		description:
			"Nurtures humility and an appreciation for the blessings in one's life, both big and small.",
		importance:
			"Fosters a positive outlook, contentment, and stronger relationships.",
		lacking:
			"Always wanting new things, a sense of entitlement, and a lack of appreciation for what they have.",
	},
	Generosity: {
		description:
			"Fosters kindness, altruism, and a spirit of giving and sharing with others.",
		importance:
			"Nurtures empathy, compassion, and a sense of social responsibility.",
		lacking:
			"Refusing to share toys or belongings, and a lack of concern for those in need.",
	},
	Godliness: {
		description:
			"Encourages the cultivation of spiritual values and a connection to a higher purpose.",
		importance:
			"Promotes humility, reverence, and a moral compass grounded in faith.",
		lacking:
			"Unwillingness to forgive, lack of empathy, and disrespect for sacred or moral principles.",
	},
	Obedience: {
		description:
			"The value of following rules, instructions, and authority with respect and a willing heart.",
		importance:
			"Fosters discipline, safety, and a cooperative spirit within the family and community.",
		lacking:
			"Disobeying house rules, not listening to parents or teachers, and general defiance.",
	},
	"Self-Control": {
		description:
			"The ability to manage one's emotions, impulses, and behaviors in constructive ways.",
		importance:
			"Crucial for emotional regulation, making thoughtful decisions, and achieving long-term goals.",
		lacking:
			"Fighting or aggression, emotional outbursts, and an inability to manage impulses.",
	},
};

const kit2Data: ValueData = {
	"Time Management": {
		description:
			"The value of using time effectively and efficiently to prioritize tasks, set goals, and manage responsibilities.",
		importance:
			"Fosters independence, reduces stress, and is essential for academic and future career success.",
		lacking:
			"Procrastination, always being late, missing deadlines, and feeling overwhelmed by tasks.",
	},
	"Work Attitude": {
		description:
			"A positive approach toward tasks, responsibilities, and challenges, encompassing dedication and enthusiasm.",
		importance:
			"Builds a strong work ethic, perseverance, and a sense of pride in one's efforts.",
		lacking:
			"Laziness, avoiding chores or work, complaining about tasks, and producing low-quality work.",
	},
	Godliness: {
		description:
			"Living in alignment with spiritual principles, reflecting a deep commitment to faith and moral integrity.",
		importance:
			"Shapes a strong moral compass and encourages a life of compassion, humility, and purpose.",
		lacking:
			"Lack of empathy, disrespect for moral boundaries, and an unwillingness to forgive or show grace.",
	},
	"Personal Grooming": {
		description:
			"Emphasizes physical self-care, hygiene, and maintaining an organized environment.",
		importance:
			"Fosters self-respect, confidence, and social awareness. Orderliness promotes focus and productivity.",
		lacking:
			"Untidy appearance, messy room or workspace, and neglecting personal hygiene.",
	},
	Diligence: {
		description:
			"The value of consistent effort, perseverance, and attention to detail in completing tasks.",
		importance:
			"Develops a strong work ethic, resilience, and the ability to achieve goals through persistence.",
		lacking:
			"Giving up easily, not completing tasks thoroughly, and a lack of attention to detail.",
	},
	Benevolence: {
		description:
			"The value of kindness, compassion, and a genuine desire to do good for others.",
		importance:
			"Fosters empathy, generosity, and a sense of social responsibility, leading to positive relationships.",
		lacking:
			"Indifference to others' suffering, selfishness, and an unwillingness to help those in need.",
	},
	Integrity: {
		description:
			"Being honest, trustworthy, and consistently adhering to moral and ethical principles.",
		importance:
			"The foundation of strong character, building a reputation of reliability and trustworthiness.",
		lacking:
			"Cheating, lying, taking credit for others' work, and a general lack of moral principles.",
	},
	Obedience: {
		description:
			"Following rules, instructions, and authority with respect and a willing heart.",
		importance:
			"Teaches discipline, respect for structure, and cooperation, which are vital in society.",
		lacking:
			"Defiance of rules at home or school, arguing with authority figures, and disrespect.",
	},
	"Servant Leadership": {
		description:
			"Leading by serving others, focusing on their well-being and development rather than personal gain.",
		importance:
			"Fosters humility, empathy, and a commitment to creating positive change in communities.",
		lacking:
			"Always wanting to be the leader for power, not responsibility; bossiness and lack of teamwork.",
	},
	Teamwork: {
		description:
			"Working collaboratively with others toward a common goal, emphasizing cooperation and communication.",
		importance:
			"Develops crucial social skills, improves problem-solving, and fosters a sense of shared responsibility.",
		lacking:
			"Inability to work in groups, blaming others for team failures, and a desire to work alone.",
	},
	Gratitude: {
		description:
			"Recognizing and appreciating the good things in life, fostering a positive and thankful outlook.",
		importance:
			"Improves emotional well-being, builds stronger relationships, and reduces feelings of entitlement.",
		lacking:
			"Constant complaining, focusing on what they don't have, and a lack of appreciation for kindness from others.",
	},
	"Creativity & Problem Solving": {
		description:
			"Integrating imagination, innovation, and critical thinking to navigate challenges and find solutions.",
		importance:
			"Fosters adaptability, resilience, and the ability to approach problems from multiple perspectives.",
		lacking:
			"Rigid thinking, difficulty with new ideas, and struggling to find solutions when faced with challenges.",
	},
};

// --- Component Prop Types ---
interface HeaderProps {
	activePage: string;
	onPageChange: (pageId: string) => void;
}

interface FooterProps {
	onPageChange: (pageId: string) => void;
}

interface HomePageProps {
	onPageChange: (pageId: string) => void;
}

interface ToolkitPageProps {
	onValueClick: (name: string, valueData: Value) => void;
}

interface ValueModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: { name: string; value: Value } | null;
}

interface NavLinkProps {
	pageId: string;
	title: string;
}

interface MobileNavLinkProps extends NavLinkProps {}

// --- Components ---

export const Header: react.FC<HeaderProps> = ({ activePage, onPageChange }) => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	const navLinks = [
		{ id: "home", title: "Home" },
		{ id: "about", title: "About" },
		{ id: "toolkit", title: "The Toolkit" },
		{ id: "training", title: "Training" },
		{ id: "shop", title: "Shop" },
		{ id: "principles", title: "Principles" },
		{ id: "predispositions", title: "Predispositions" },
		{ id: "contact", title: "Contact" },
	];

	const handleNavClick = (pageId: string) => {
		onPageChange(pageId);
		setMobileMenuOpen(false);
		window.scrollTo(0, 0);
	};

	const NavLink: react.FC<NavLinkProps> = ({ pageId, title }) => (
		<a
			href={`#${pageId}`}
			className={`nav-link ${activePage === pageId ? "active" : ""}`}
			onClick={e => {
				e.preventDefault();
				handleNavClick(pageId);
			}}>
			{title}
		</a>
	);

	const MobileNavLink: react.FC<MobileNavLinkProps> = ({ pageId, title }) => (
		<a
			href={`#${pageId}`}
			className={`block nav-link ${
				activePage === pageId ? "active" : ""
			}`}
			onClick={e => {
				e.preventDefault();
				handleNavClick(pageId);
			}}>
			{title}
		</a>
	);

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="container mx-auto px-6 py-3 flex justify-between items-center">
				<a
					href="#home"
					onClick={e => {
						e.preventDefault();
						handleNavClick("home");
					}}
					className="text-xl font-bold text-blue-600">
					CorePath International
				</a>
				<div className="hidden md:flex items-center space-x-4">
					{navLinks.map(link => (
						<NavLink
							key={link.id}
							pageId={link.id}
							title={link.title}
						/>
					))}
					<button className="ml-4 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
						Members Login
					</button>
				</div>
				<div className="md:hidden">
					<button
						onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
						className="text-gray-700 hover:text-blue-600 focus:outline-none">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
				</div>
			</nav>
			{isMobileMenuOpen && (
				<div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
					{navLinks.map(link => (
						<MobileNavLink
							key={link.id}
							pageId={link.id}
							title={link.title}
						/>
					))}
					<button className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
						Members Login
					</button>
				</div>
			)}
		</header>
	);
};

export const Footer: react.FC<FooterProps> = ({ onPageChange }) => {
	const handleNavClick = (pageId: string) => {
		onPageChange(pageId);
		window.scrollTo(0, 0);
	};

	return (
		<footer className="bg-gray-800 text-white">
			<div className="container mx-auto px-6 py-8">
				<div className="sm:flex sm:justify-between">
					<div className="mb-4 sm:mb-0">
						<h3 className="text-lg font-bold">
							CorePath International
						</h3>
						<p className="text-gray-400 mt-2">
							Building a brighter future, one value at a time.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-bold">Quick Links</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<a
									href="#home"
									onClick={e => {
										e.preventDefault();
										handleNavClick("home");
									}}
									className="text-gray-400 hover:text-white">
									Home
								</a>
							</li>
							<li>
								<a
									href="#about"
									onClick={e => {
										e.preventDefault();
										handleNavClick("about");
									}}
									className="text-gray-400 hover:text-white">
									About
								</a>
							</li>
							<li>
								<a
									href="#toolkit"
									onClick={e => {
										e.preventDefault();
										handleNavClick("toolkit");
									}}
									className="text-gray-400 hover:text-white">
									The Toolkit
								</a>
							</li>
							<li>
								<a
									href="#training"
									onClick={e => {
										e.preventDefault();
										handleNavClick("training");
									}}
									className="text-gray-400 hover:text-white">
									Training
								</a>
							</li>
							<li>
								<a
									href="#shop"
									onClick={e => {
										e.preventDefault();
										handleNavClick("shop");
									}}
									className="text-gray-400 hover:text-white">
									Shop
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold">Contact</h3>
						<ul className="mt-2 space-y-2 text-gray-400">
							<li>Email: info@corepath.com</li>
							<li>Phone: +1 (555) 123-4567</li>
						</ul>
					</div>
				</div>
				<hr className="my-6 border-gray-700" />
				<div className="text-center text-gray-400">
					&copy; 2024 CorePath Impact Publishers. All Rights Reserved.
				</div>
			</div>
		</footer>
	);
};

export const HomePage: react.FC<HomePageProps> = ({ onPageChange }) => (
	<div className="fade-in">
		<section className="hero-bg text-white">
			<div className="bg-black bg-opacity-50">
				<div className="container mx-auto px-6 py-24 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-4">
						Intentional Parenting for a Value-Driven Child
					</h1>
					<p className="text-lg md:text-xl mb-8">
						Nurture morally grounded, resilient, and successful
						children with the VDC Toolkit.
					</p>
					<a
						href="#toolkit"
						onClick={e => {
							e.preventDefault();
							onPageChange("toolkit");
							window.scrollTo(0, 0);
						}}
						className="bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-3 px-8 text-lg rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
						Discover the Toolkit
					</a>
				</div>
			</div>
		</section>
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-800">
						Your Companion for Effective Parenting
					</h2>
					<p className="text-gray-600 mt-4 max-w-2xl mx-auto">
						The Value Driven Child (VDC) parenting Toolkit is your
						essential companion for intentional and effective
						parenting. It is meticulously designed to equip parents
						and caregivers with proven methods to nurture morally
						grounded, resilient, and successful children in today’s
						ever-changing world.
					</p>
				</div>
				<div className="grid md:grid-cols-4 gap-8 text-center">
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-blue-600 mb-2">
							Affirm
						</h3>
						<p className="text-gray-600">
							Reinforce your child's positive self-identity by
							recognizing and celebrating their inherent worth.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-green-600 mb-2">
							Train
						</h3>
						<p className="text-gray-600">
							Introduce and educate your child on high-impact
							foundational core values.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-yellow-600 mb-2">
							Track
						</h3>
						<p className="text-gray-600">
							Monitor and assess your child's understanding and
							application of the values.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<h3 className="text-xl font-bold text-red-600 mb-2">
							Reward
						</h3>
						<p className="text-gray-600">
							Use positive reinforcement to solidify desired
							values and behaviors.
						</p>
					</div>
				</div>
			</div>
		</section>
		<section className="py-20">
			<div className="container mx-auto px-6">
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-800">
						Understand Your Child's Unique Design
					</h2>
					<p className="text-gray-600 mt-4 max-w-2xl mx-auto">
						The VDC Toolkit helps you discover your child's natural
						predispositions—Gold, Blue, Green, or Orange—allowing
						for personalized parenting that nurtures their
						individual strengths.
					</p>
				</div>
				<div className="flex justify-center flex-wrap gap-4">
					<span className="bg-yellow-400 text-white px-4 py-2 rounded-full font-semibold">
						Gold
					</span>
					<span className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold">
						Blue
					</span>
					<span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold">
						Green
					</span>
					<span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
						Orange
					</span>
				</div>
			</div>
		</section>
	</div>
);

export const AboutPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					About The VDC Toolkit
				</h1>
				<div className="max-w-4xl mx-auto text-gray-700 space-y-6">
					<p className="text-lg">
						Welcome to the Value Driven Child (VDC) Toolkit, a
						transformative journey of intentional parenting. This
						toolkit is thoughtfully designed to empower parents,
						guardians, and educators, providing a comprehensive
						resource aimed at nurturing character development in
						children.
					</p>
					<p>
						The VDC Toolkit offers a holistic approach to parenting,
						seamlessly blending education, motivation, and guidance
						to help children become the best versions of themselves.
						With an array of carefully designed resources, this
						toolkit equips you with the tools necessary to nurture
						strong character and instill enduring values that will
						serve children throughout their lives.
					</p>
					<h2 className="text-2xl font-bold text-gray-800 pt-6">
						Why Choose the VDC Toolkit?
					</h2>
					<p>
						Traditional parenting methods often rely on a generic,
						one-size-fits-all approach. The VDC Toolkit offers a
						personalized and proactive strategy. We help you move
						beyond reactive parenting to shape your child’s internal
						moral compass. We also systematically integrate biblical
						reinforcement into each character value, anchoring moral
						growth in spiritual truth.
					</p>
					<ul className="list-disc list-inside space-y-2">
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
					</ul>
				</div>
			</div>
		</section>
	</div>
);

export const ToolkitPage: react.FC<ToolkitPageProps> = ({ onValueClick }) => {
	const ValueList: react.FC<{ data: ValueData }> = ({ data }) => (
		<div className="space-y-2 value-item-list">
			{Object.entries(data).map(([name, valueData]) => (
				<div key={name} onClick={() => onValueClick(name, valueData)}>
					{name}
				</div>
			))}
		</div>
	);

	return (
		<div className="fade-in">
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
						The VDC Train-up Toolkit
					</h1>
					<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
						The VDC Train-up Toolkit comprises two distinct
						age-specific kits, each meticulously tailored to cater
						to specific developmental stages. This ensures that
						character education is relevant, engaging, and impactful
						throughout a child’s growth.
					</p>
					<div className="grid lg:grid-cols-2 gap-12">
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold text-blue-600 mb-4">
								Kit 1: Early Development (4-9 Years)
							</h2>
							<p className="text-gray-600 mb-6">
								This kit focuses on 12 core values that form the
								basis of moral and ethical growth during early
								childhood. Click on a value to learn more.
							</p>
							<ValueList data={kit1Data} />
						</div>
						<div className="bg-white p-8 rounded-lg shadow-lg">
							<h2 className="text-2xl font-bold text-green-600 mb-4">
								Kit 2: Transitional Core Values (10-18 Years)
							</h2>
							<p className="text-gray-600 mb-6">
								This kit focuses on 12 essential values that
								support the complex transition from childhood
								into young adulthood. Click on a value to learn
								more.
							</p>
							<ValueList data={kit2Data} />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export const TrainingPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Parenting Training Classes
				</h1>
				<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
					Enroll in our training classes to master the VDC Toolkit.
					Our expert-led sessions provide in-depth guidance on
					applying the principles of value-driven parenting to nurture
					your child's growth and character.
				</p>
				<div className="bg-gray-50 p-8 rounded-lg shadow-lg">
					<h2 className="text-2xl font-bold text-gray-800 mb-6">
						Upcoming Classes
					</h2>
					<div className="space-y-6">
						<div className="md:flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
							<div>
								<h3 className="text-xl font-bold text-blue-600">
									Introduction to the VDC Toolkit
								</h3>
								<p className="text-gray-600">
									<strong>Date:</strong> July 15, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-gray-600">
									An overview of the core principles and how
									to get started.
								</p>
							</div>
							<button className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Enroll Now
							</button>
						</div>
						<div className="md:flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
							<div>
								<h3 className="text-xl font-bold text-blue-600">
									Understanding Your Child's Predisposition
								</h3>
								<p className="text-gray-600">
									<strong>Date:</strong> July 22, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-gray-600">
									A deep dive into the four color types and
									personalized parenting strategies.
								</p>
							</div>
							<button className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Enroll Now
							</button>
						</div>
						<div className="md:flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
							<div>
								<h3 className="text-xl font-bold text-blue-600">
									Advanced Habit Formation
								</h3>
								<p className="text-gray-600">
									<strong>Date:</strong> July 29, 2024 |{" "}
									<strong>Time:</strong> 10:00 AM - 12:00 PM
								</p>
								<p className="text-gray-600">
									Learn to apply the Habit Loop and Feedback
									Loop principles effectively.
								</p>
							</div>
							<button className="mt-4 md:mt-0 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Enroll Now
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);

export const ShopPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Shop Our Toolkit & Accessories
				</h1>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/e0e7ff/3730a3?text=VDC+Toolkit"
							alt="VDC Toolkit"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								VDC Toolkit (Ages 4-9)
							</h3>
							<p className="text-gray-600 mb-4">
								The complete foundational toolkit for early
								development.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-blue-600">
									$49.99
								</span>
								<button className="bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/d1fae5/047857?text=VDC+Toolkit"
							alt="VDC Toolkit"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								VDC Toolkit (Ages 10-18)
							</h3>
							<p className="text-gray-600 mb-4">
								The complete transitional toolkit for
								adolescents.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-green-600">
									$49.99
								</span>
								<button className="bg-green-600 text-white hover:bg-green-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/fef3c7/92400e?text=Affirmation+Cards"
							alt="Affirmation Cards"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								Affirmation Card Pack
							</h3>
							<p className="text-gray-600 mb-4">
								A set of 50 affirmation cards to build
								self-belief.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-yellow-600">
									$14.99
								</span>
								<button className="bg-yellow-600 text-white hover:bg-yellow-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
					<div className="bg-white rounded-lg shadow-lg overflow-hidden">
						<img
							src="https://placehold.co/600x400/fee2e2/991b1b?text=Reward+Charts"
							alt="Reward Charts"
							className="w-full h-56 object-cover"
						/>
						<div className="p-6">
							<h3 className="text-xl font-bold text-gray-800 mb-2">
								My VDC Reward Charts (Pack of 5)
							</h3>
							<p className="text-gray-600 mb-4">
								Track progress and celebrate growth with these
								visual charts.
							</p>
							<div className="flex justify-between items-center">
								<span className="text-2xl font-bold text-red-600">
									$9.99
								</span>
								<button className="bg-red-600 text-white hover:bg-red-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
);

export const PrinciplesPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-white">
			<div className="container mx-auto px-6">
				<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
					Our Guiding Principles
				</h1>
				<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
					The VDC Train-up Toolkit is anchored on a set of six guiding
					principles that shape its structure, content, and
					implementation. These principles ensure that the toolkit is
					effective, comprehensive, and adaptable.
				</p>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							1. Foundational Core Values
						</h3>
						<p className="text-gray-600">
							Some values are more fundamental as they catalyze a
							wider range of virtues. We focus on 24 foundational
							values that inspire over 170 resultant values.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							2. Exclusive Natural Predispositions
						</h3>
						<p className="text-gray-600">
							Each child is unique. We help you identify your
							child's natural predisposition to tailor your
							parenting for optimal growth.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							3. Affirmation
						</h3>
						<p className="text-gray-600">
							Positive statements shape thoughts and behaviors. We
							use affirmation to reinforce self-belief and a
							positive identity rooted in truth.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							4. Operant Conditioning
						</h3>
						<p className="text-gray-600">
							Behavior is shaped by consequences. We use a system
							of rewards and corrective measures to instill values
							and guide behavior effectively.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							5. The Habit Loop
						</h3>
						<p className="text-gray-600">
							Consistent repetition transforms behaviors into
							automatic habits. Our system helps create positive
							habits through a cue-routine-reward cycle.
						</p>
					</div>
					<div className="p-6 bg-gray-50 rounded-lg shadow-md">
						<h3 className="text-xl font-bold text-gray-800 mb-2">
							6. The Feedback Loop
						</h3>
						<p className="text-gray-600">
							What gets measured gets managed. We provide tools to
							track, measure, and evaluate behavior, which is
							essential for effective improvement.
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>
);

export const PredispositionsPage: react.FC = () => {
	const [active, setActive] = useState<string>("blue");

	const predispositions: Predispositions = {
		blue: {
			title: "The Blue Child",
			header: "Empathetic & Harmonious",
			description:
				"Driven by relationships and harmony, Blue children are compassionate, nurturing, and deeply relationship-oriented. They are the heart of the home, prioritizing emotional connection and peace.",
			parenting:
				"Be a <strong>Nurturing Guide</strong>. Focus on emotional security, empathy, and relationship-building with a compassionate and supportive style.",
		},
		orange: {
			title: "The Orange Child",
			header: "Action-Oriented & Spontaneous",
			description:
				"Driven by action and freedom, Orange children are energetic, creative, and love to explore. They bring enthusiasm and a love for adventure to every situation.",
			parenting:
				"Be an <strong>Adventurous Coach</strong>. Focus on freedom, spontaneity, and hands-on learning with an energetic and motivational style.",
		},
		gold: {
			title: "The Gold Child",
			header: "Structured & Responsible",
			description:
				"Driven by structure and duty, Gold children are organized, dependable, and detail-oriented. They are the steady anchors who thrive on clear expectations and routine.",
			parenting:
				"Be a <strong>Structured Guide</strong>. Focus on discipline, responsibility, and stability with a consistent, rule-based style.",
		},
		green: {
			title: "The Green Child",
			header: "Analytical & Independent",
			description:
				"Driven by understanding and logic, Green children are independent thinkers who are curious and enjoy problem-solving. They seek knowledge and truth.",
			parenting:
				"Be an <strong>Analytical Mentor</strong>. Focus on intellectual stimulation, independence, and logical reasoning with a knowledge-driven style.",
		},
	};

	interface CardProps {
		color: string;
		children: React.ReactNode;
	}
	const Card: react.FC<CardProps> = ({ color, children }) => (
		<div
			className={`p-6 bg-${color}-100 rounded-t-lg shadow-md predisposition-card ${
				active === color ? "active-card" : ""
			}`}
			onClick={() => setActive(color)}>
			<h3 className={`text-2xl font-bold text-${color}-800 text-center`}>
				{children}
			</h3>
		</div>
	);

	interface DescriptionProps {
		color: string;
		data: Predisposition;
	}
	const Description: react.FC<DescriptionProps> = ({ color, data }) => (
		<div className={`description-panel ${active === color ? "show" : ""}`}>
			<div className="description-content fade-in">
				<h2 className={`text-2xl font-bold text-${color}-800 mb-4`}>
					{data.header}
				</h2>
				<p className="text-gray-700 mb-4">{data.description}</p>
				<p
					dangerouslySetInnerHTML={{
						__html: `<strong>Parenting Style:</strong> ${data.parenting}`,
					}}
				/>
			</div>
		</div>
	);

	return (
		<div className="fade-in">
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
						The Four-Color Predispositions
					</h1>
					<p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
						Discover your child's natural predisposition quadrant to
						better understand their needs, communication style, and
						motivations. This is the key to unlocking personalized
						and effective parenting.
					</p>

					<div className="grid md:grid-cols-2 gap-8">
						<div>
							<Card color="blue">
								{predispositions.blue.title}
							</Card>
							<Description
								color="blue"
								data={predispositions.blue}
							/>
						</div>
						<div>
							<Card color="orange">
								{predispositions.orange.title}
							</Card>
							<Description
								color="orange"
								data={predispositions.orange}
							/>
						</div>
						<div>
							<Card color="yellow">
								{predispositions.gold.title}
							</Card>
							<Description
								color="yellow"
								data={predispositions.gold}
							/>
						</div>
						<div>
							<Card color="green">
								{predispositions.green.title}
							</Card>
							<Description
								color="green"
								data={predispositions.green}
							/>
						</div>
					</div>

					<div className="text-center mt-12">
						<a
							href="http://www.vdctoolkit.com/predisposition-quiz"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block font-bold py-3 px-8 text-lg rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1 bg-blue-600 text-white hover:bg-blue-700">
							Take the Predisposition Quiz
						</a>
					</div>
				</div>
			</section>
		</div>
	);
};

export const ContactPage: react.FC = () => (
	<div className="fade-in">
		<section className="py-20 bg-gray-100">
			<div className="container mx-auto px-6">
				<div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
						Contact Us
					</h1>
					<p className="text-center text-gray-600 mb-8">
						We'd love to hear from you. Please fill out the form
						below to get in touch.
					</p>
					<form>
						<div className="mb-4">
							<label
								htmlFor="name"
								className="block text-gray-700 font-bold mb-2">
								Name
							</label>
							<input
								type="text"
								id="name"
								name="name"
								className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="email"
								className="block text-gray-700 font-bold mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
								required
							/>
						</div>
						<div className="mb-4">
							<label
								htmlFor="message"
								className="block text-gray-700 font-bold mb-2">
								Message
							</label>
							<textarea
								id="message"
								name="message"
								rows={5}
								className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
								required></textarea>
						</div>
						<div className="text-center">
							<button
								type="submit"
								className="bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
								Send Message
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	</div>
);

export const ValueModal: react.FC<ValueModalProps> = ({
	isOpen,
	onClose,
	data,
}) => {
	if (!isOpen || !data) return null;

	return (
		<div
			className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center fade-in"
			onClick={onClose}>
			<div
				className="relative mx-auto p-5 border w-11/12 md:max-w-xl shadow-lg rounded-md bg-white"
				onClick={e => e.stopPropagation()}>
				<div className="mt-3 text-center">
					<h3 className="text-2xl leading-6 font-bold text-gray-900">
						{data.name}
					</h3>
					<div className="mt-4 px-4 py-3 text-left space-y-3">
						<p className="text-gray-700">
							<strong>Description:</strong>{" "}
							{data.value.description}
						</p>
						<p className="text-gray-700">
							<strong>Importance:</strong> {data.value.importance}
						</p>
						<p className="text-gray-700">
							<strong>When Lacking:</strong> {data.value.lacking}
						</p>
					</div>
					<div className="items-center px-4 py-3">
						<button
							onClick={onClose}
							className="bg-gray-600 text-white hover:bg-gray-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1 w-full">
							Close
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

