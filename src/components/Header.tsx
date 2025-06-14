import * as react from "react";
import { useState, useEffect } from "react";
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

const MobileNavLink: react.FC<NavLinkProps> = ({
	pageId,
	title,
	activePage,
}) => (
	<Link
		to={`/${pageId}`}
		className={`block nav-link ${activePage === pageId ? "active" : ""}`}>
		{title}
	</Link>
);

const NavLink: react.FC<NavLinkProps> = ({ pageId, title, activePage }) => (
	<Link
		to={`/${pageId}`}
		className={`nav-link ${activePage === pageId ? "active" : ""}`}>
		{title}
	</Link>
);

// --- Components ---
export const Header: react.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout, isAdmin } = useAuth();
	const [isUserAdmin, setIsUserAdmin] = useState(false);
	const activePage = location.pathname.split("/")[1];
	const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

	useEffect(() => {
		const checkAdminStatus = async () => {
			const adminStatus = await isAdmin();
			setIsUserAdmin(adminStatus);
		};
		checkAdminStatus();
	}, [isAdmin]);

	return (
		<header className="bg-white shadow-md sticky top-0 z-50">
			<nav className="container mx-auto px-6 py-3 flex justify-between items-center">
				<Link to="/" className="text-xl font-bold text-blue-600">
					CorePath International
				</Link>
				<div className="hidden md:flex items-center space-x-4">
					{navLinks
						.filter(link => !isUserAdmin || link.id !== "contact")
						.map(link => (
							<NavLink
								key={link.id}
								pageId={link.id}
								title={link.title}
								activePage={activePage}
							/>
						))}
					{user ? (
						<Button
							onClick={async () => {
								await logout();
								navigate("/");
							}}
							variant="default"
							className="ml-4 bg-red-600 hover:bg-red-700">
							Logout
						</Button>
					) : (
						<Link
							to="/auth"
							className="ml-4 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
							Members Login
						</Link>
					)}
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
					{navLinks
						.filter(link => !isUserAdmin || link.id !== "contact")
						.map(link => (
							<MobileNavLink
								key={link.id}
								pageId={link.id}
								title={link.title}
								activePage={activePage}
							/>
						))}
					{user ? (
						<Button
							onClick={async () => {
								await logout();
								setMobileMenuOpen(false);
								navigate("/");
							}}
							variant="default"
							className="w-full mt-2 bg-red-600 hover:bg-red-700">
							Logout
						</Button>
					) : (
						<Link
							to="/auth"
							className="w-full mt-2 bg-blue-600 text-white hover:bg-blue-700 inline-block font-bold py-2 px-6 rounded-full transition-all duration-300 ease-in-out transform shadow-md hover:shadow-lg hover:-translate-y-1">
							Members Login
						</Link>
					)}
				</div>
			)}
		</header>
	);
};
