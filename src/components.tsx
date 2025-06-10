// --- Type Definitions ---

export interface Value {
	description: string;
	importance: string;
	lacking: string;
}

export interface ValueData {
	[key: string]: Value;
}

export interface Predisposition {
	title: string;
	header: string;
	description: string;
	parenting: string;
}

export interface Predispositions {
	[key: string]: Predisposition;
}

// --- Data for the Toolkit ---
export const kit1Data: ValueData = {
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

export const kit2Data: ValueData = {
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
export interface HeaderProps {
	activePage: string;
	onPageChange: (pageId: string) => void;
}

export interface FooterProps {
	onPageChange: (pageId: string) => void;
}

export interface HomePageProps {
	onPageChange: (pageId: string) => void;
}

export interface ToolkitPageProps {
	onValueClick: (name: string, valueData: Value) => void;
}

export interface ValueModalProps {
	isOpen: boolean;
	onClose: () => void;
	data: { name: string; value: Value } | null;
}

export interface NavLinkProps {
	pageId: string;
	title: string;
}

export interface MobileNavLinkProps extends NavLinkProps {}
