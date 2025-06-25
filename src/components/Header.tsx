import * as React from "react";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/useCart";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { HashLink } from "react-router-hash-link";
import { motion, type Variants } from "framer-motion";
import { ShoppingCart } from "lucide-react";
export interface NavLinkProps {
	pageId: string;
	title: string;
	path: string;
	activePage: string;
}
const navLinks = [
	{ id: "home", title: "Home", path: "/#home" },
	{ id: "about", title: "About", path: "/#about" },
	{ id: "toolkit", title: "VDC Toolkit", path: "/#toolkit" },
	{ id: "products", title: "Products", path: "/products" },
	{ id: "training", title: "Training", path: "/#training" },
	{ id: "shop", title: "Shop", path: "/shop" },
	{ id: "contact", title: "Contact", path: "/#contact" },
];

const MobileNavLink: React.FC<
	NavLinkProps & { setMobileMenuOpen: (open: boolean) => void }
> = ({ pageId, title, path, activePage, setMobileMenuOpen }) => {
	const isLinkActive =
		activePage === pageId || (pageId === "home" && activePage === "");
	const className = `block py-3 px-6 text-lg font-medium rounded-lg transition-all duration-300 ease-in-out ${
		isLinkActive
			? "bg-[#FFFBDE] text-[#096B68] font-semibold shadow-md"
			: "text-[#FFFBDE] hover:bg-[#129990] hover:bg-opacity-80"
	}`;

	const handleClick = () => {
		setMobileMenuOpen(false);
	};

	const LinkComponent =
		path.startsWith("/") && !path.includes("#") ? Link : HashLink;

	return (
		<LinkComponent to={path} onClick={handleClick} className={className}>
			{title}
		</LinkComponent>
	);
};

const NavLink: React.FC<NavLinkProps> = ({
	pageId,
	title,
	path,
	activePage,
}) => {
	const className = cn(
		"relative px-4 py-2 mx-1 rounded-lg text-base font-medium transition-all duration-200 ease-in-out text-[#FFFBDE]",
		"after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-[#FFFBDE] after:transition-transform after:duration-300 after:ease-in-out after:origin-center",
		"hover:after:scale-x-100",
		{
			"after:scale-x-100 group-hover:after:scale-x-0":
				activePage === pageId ||
				(pageId === "home" && activePage === ""),
		}
	);

	const LinkComponent =
		path.startsWith("/") && !path.includes("#") ? Link : HashLink;

	return (
		<LinkComponent to={path} className={className}>
			{title}
		</LinkComponent>
	);
};

const navLinkVariants: Variants = {
	hidden: { y: -20, opacity: 0 },
	visible: (i: number) => ({
		y: 0,
		opacity: 1,
		transition: {
			delay: i * 0.1 + 0.4, // Staggered delay for each link
			duration: 0.4,
			ease: "easeOut",
		},
	}),
};

const HeaderComponent: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout, isAdmin } = useAuth();
	const { itemCount, openCart } = useCart();
	const [isUserAdmin, setIsUserAdmin] = useState(false);

	useEffect(() => {
		const checkAdminStatus = async () => {
			const adminStatus = await isAdmin();
			setIsUserAdmin(adminStatus);
		};
		if (user) {
			checkAdminStatus();
		}
	}, [isAdmin, user]);
	const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
	const [activePage, setActivePage] = useState(
		() => location.hash.replace("#", "") || "home"
	);

	const displayedNavLinks = useMemo(() => {
		const list = [...navLinks];
		if (isUserAdmin) {
			list.push({ id: "admin", title: "Dashboard", path: "/admin" });
		}
		return list;
	}, [isUserAdmin]);

	// stable callbacks
	const handleLogin = useCallback(() => navigate("/auth"), [navigate]);
	const toggleMobileMenu = useCallback(
		() => setMobileMenuOpen(prev => !prev),
		[]
	);

	const observer = useRef<IntersectionObserver | null>(null);

	useEffect(() => {
		const sections = navLinks
			.map(link => document.getElementById(link.id))
			.filter((el): el is HTMLElement => el !== null);

		if (sections.length === 0) {
			return;
		}

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setActivePage(entry.target.id);
				}
			});
		};

		observer.current = new IntersectionObserver(observerCallback, {
			rootMargin: "-50% 0px -50% 0px",
			threshold: 0,
		});

		sections.forEach(section => observer.current?.observe(section));

		return () => {
			observer.current?.disconnect();
		};
	}, [location]);

	return (
		<motion.header
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className="bg-[#096B68] shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
			<nav className="container mx-auto px-4">
				<div className="flex justify-between items-center h-20">
					<Link to="/" className="flex items-center group">
						<span className="text-2xl font-bold text-[#FFFBDE] transition-transform duration-300 group-hover:scale-105">
							CorePath Impact
						</span>
					</Link>
					<div className="hidden md:flex items-center space-x-1 group">
						{displayedNavLinks.map((link, index) => (
							<motion.div
								key={link.id}
								custom={index}
								variants={navLinkVariants}
								initial="hidden"
								animate="visible">
								<NavLink
									pageId={link.id}
									title={link.title}
									path={link.path}
									activePage={activePage}
								/>
							</motion.div>
						))}
						{user ? (
							<div className="ml-4 flex items-center space-x-4">
								{!location.pathname.startsWith("/admin") && (
									<button
										onClick={openCart}
										className="relative inline-flex items-center p-2 text-base font-medium text-[#FFFBDE] hover:text-[#C2EAE7] rounded-full hover:bg-white/10">
										<ShoppingCart className="h-5 w-5" />
										{itemCount > 0 && (
											<span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-[#FFD59A] text-[#3A3A3A] text-xs font-bold">
												{itemCount}
											</span>
										)}
									</button>
								)}
								<Button
									variant="outline"
									size="sm"
									onClick={logout}
									className="border-[#FFFBDE] text-[#FFFBDE] hover:bg-[#129990] hover:text-[#FFFBDE] hover:border-[#129990] transition-all duration-200">
									Logout
								</Button>
							</div>
						) : (
							<Button
								variant="outline"
								size="sm"
								onClick={handleLogin}
								className="ml-4 border-cream text-cream hover:bg-teal-medium hover:text-cream hover:border-teal-medium transition-all duration-200">
								Login
							</Button>
						)}
					</div>
					<div className="md:hidden">
						<button
							onClick={toggleMobileMenu}
							className="p-2 rounded-md text-[#FFFBDE] hover:bg-[#129990] hover:bg-opacity-30 focus:outline-none transition-colors duration-200"
							aria-label="Toggle menu">
							{isMobileMenuOpen ? (
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
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							) : (
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
							)}
						</button>
					</div>
				</div>
			</nav>
			{isMobileMenuOpen && (
				<nav className="flex-1 p-4 space-y-2 bg-opacity-95 backdrop-blur-sm">
					{displayedNavLinks.map(link => (
						<MobileNavLink
							key={link.id}
							pageId={link.id}
							title={link.title}
							path={link.path}
							activePage={activePage}
							setMobileMenuOpen={setMobileMenuOpen}
						/>
					))}
					<div className="pt-4 mt-4 border-t border-[#FFFBDE]/20">
						{user ? (
							<>
								{!location.pathname.startsWith("/admin") && (
									<button
										onClick={() => {
											openCart();
											setMobileMenuOpen(false);
										}}
										className="relative flex items-center w-full text-left px-6 py-3 text-lg font-medium rounded-lg text-[#FFFBDE] hover:bg-[#129990]">
										<ShoppingCart className="h-5 w-5 mr-3" />
										<span>Cart</span>
										{itemCount > 0 && (
											<span className="absolute top-3 right-4 flex items-center justify-center h-5 w-5 rounded-full bg-[#FFD59A] text-[#3A3A3A] text-xs font-bold">
												{itemCount}
											</span>
										)}
									</button>
								)}
								<Button
									variant="outline"
									size="sm"
									onClick={() => {
										logout();
										setMobileMenuOpen(false);
									}}
									className="w-full mt-2 border-[#FFFBDE] text-[#FFFBDE] hover:bg-[#129990] hover:text-[#FFFBDE] hover:border-[#129990] transition-all duration-200">
									Logout
								</Button>
							</>
						) : (
							<Button
								variant="outline"
								size="sm"
								onClick={() => {
									navigate("/auth");
									setMobileMenuOpen(false);
								}}
								className="w-full mt-4 border-[#FFFBDE] text-[#FFFBDE] hover:bg-[#129990] hover:text-[#FFFBDE] hover:border-[#129990] transition-all duration-200">
								Login
							</Button>
						)}
					</div>
				</nav>
			)}
		</motion.header>
	);
};

// Export memoized component to avoid unnecessary re-renders
export const Header = React.memo(HeaderComponent);
