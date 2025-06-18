import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import idris from "../assets/Idris.jpg";
import denzel from "../assets/denzel.jpg";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HashLink } from "react-router-hash-link";
export default function Testimonials() {
	const testimonials = [
		{
			quote: `Before VGC, I didn’t know how to deal with my son’s anger
					outbursts. Now I understand he needed to develop empathy.
					This toolkit changed our home.`,
			name: "John Doe",
			designation: "Parent, Uganda",
			src: idris,
		},
		{
			quote: `Our school saw a dramatic drop in bullying after applying
					VGC principles. Kids now reflect before reacting.`,
			name: "John Doe",
			designation: "Headteacher, Kenya",
			src: denzel,
		},
		{
			quote: `The corrective cards gave me a new way to
					discipline—without shame, with purpose.`,
			name: "",
			designation: "Father of three",
			src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		},
	];
	return (
		<div id="testimonials">
			<AnimatedSection className="px-4 py-12 bg-teal-900 text-yellow-50">
				<h2 className="text-3xl font-bold text-yellow-50 text-center mb-10">
					Testimonials & Impact Stories
				</h2>

				<h3 className="text-2xl font-semibold text-yellow-50 text-center mb-6">
					Real Families. Real Change.
				</h3>

				<AnimatedTestimonials testimonials={testimonials} autoplay />
				<div className="max-w-2xl mx-auto flex flex-wrap gap-4 justify-center text-yellow-50 font-medium">
					<HashLink to="/#testimonials">Read More Stories</HashLink>
					<HashLink to="/#testimonials">
						Submit Your Testimony
					</HashLink>
				</div>
			</AnimatedSection>
		</div>
	);
}
