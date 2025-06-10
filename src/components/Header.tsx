import * as react from "react";
import { useState } from "react";
import type {
	HeaderProps,
	NavLinkProps,
	MobileNavLinkProps,
} from "../components";

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
