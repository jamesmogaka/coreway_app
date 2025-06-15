import * as React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
export interface NavLinkProps {
	pageId: string;
	title: string;
	activePage: string;
}
const navLinks = [
	{ id: "", title: "Home" },
	{ id: "about", title: "About" },
	{ id: "toolkit", title: "The Toolkit" },
	{ id: "training", title: "Training" },
	{ id: "shop", title: "Shop" },
	{ id: "principles", title: "Principles" },
	{ id: "predispositions", title: "Predispositions" },
	{ id: "contact", title: "Contact" },
];

const MobileNavLink: React.FC<NavLinkProps> = ({
	pageId,
	title,
	activePage,
}) => (
	<Link
		to={`/${pageId}`}
		className={`block py-2 px-4 font-semibold text-[#FFFBDE] rounded-md transition-colors ${
			activePage === pageId
				? "bg-[#FFFBDE] text-[#096B68] font-semibold"
				: "hover:bg-[#129990]"
		}`}>
		{title}
	</Link>
);

const NavLink: React.FC<NavLinkProps> = ({ pageId, title, activePage }) => (
	<Link
		to={`/${pageId}`}
		className={`px-3 py-2 rounded-md text-base font-semibold text-[#FFFBDE] transition-colors ${
			activePage === pageId
				? "bg-[#FFFBDE] text-[#096B68] font-semibold"
				: "hover:bg-[#129990]"
		}`}>
		{title}
	</Link>
);

export const Header: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const activePage = location.pathname.split("/")[1];
	const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	return (
		<header className="bg-[#096B68] shadow-md sticky top-0 z-50">
			<nav className="container mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="flex items-center">
						<span className="text-xl font-bold text-[#FFFBDE]">
							Coreway
						</span>
					</Link>
					<div className="hidden md:flex items-center space-x-1">
						{navLinks.map(link => (
							<NavLink
								key={link.id}
								pageId={link.id}
								title={link.title}
								activePage={activePage}
							/>
						))}
						{user ? (
							<div className="ml-4 flex items-center space-x-2">
								<Button
									variant="outline"
									size="sm"
									onClick={logout}
									className="ml-2 border-[#FFFBDE] text-[#FFFBDE] hover:bg-[#129990] hover:text-[#FFFBDE]">
									Logout
								</Button>
							</div>
						) : (
							<Button
								variant="outline"
								size="sm"
								onClick={() => navigate("/auth")}
								className="ml-4 border-[#FFFBDE] text-[#FFFBDE] hover:bg-[#129990] hover:text-[#FFFBDE]">
								Login
							</Button>
						)}
					</div>
					<div className="md:hidden">
						<button
							onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
							className="text-[#FFFBDE] hover:text-[#FFFBDE]/80 focus:outline-none">
							<svg
								className="h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						</button>
					</div>
				</div>
			</nav>
			{isMobileMenuOpen && (
				<nav className="flex-1 p-4 space-y-1">
					{navLinks.map(link => (
						<MobileNavLink
							key={link.id}
							pageId={link.id}
							title={link.title}
							activePage={activePage}
						/>
					))}
					{user ? (
						<div className="pt-4 mt-4 border-t border-[#FFFBDE]/20">
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									logout();
									setMobileMenuOpen(false);
								}}
								className="w-full border-[#FFFBDE] text-[#FFFBDE] hover:bg-[#129990] hover:text-[#FFFBDE]">
								Logout
							</Button>
						</div>
					) : (
						<Button
							variant="outline"
							size="sm"
							onClick={() => {
								navigate("/auth");
								setMobileMenuOpen(false);
							}}
							className="w-full mt-4 border-[#FFFBDE] text-[#FFFBDE] hover:bg-[#129990] hover:text-[#FFFBDE]">
							Login
						</Button>
					)}
				</nav>
			)}
		</header>
	);
};
