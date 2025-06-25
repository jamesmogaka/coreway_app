import * as React from "react";
import { motion, type Variants } from "framer-motion";

interface AnimatedSectionProps {
	children: React.ReactNode;
	className?: string;
	delay?: number;
	id?: string;
}

const sectionVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: (delay: number = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut", delay },
	}),
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className, delay = 0, id }) => {
	return (
		<motion.section
			id={id}
			className={className}
			custom={delay}
			variants={sectionVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}>
			{children}
		</motion.section>
	);
};
