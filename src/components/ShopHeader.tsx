import { NavLink } from "react-router-dom";
import { useCart } from "../contexts/useCart";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

export function ShopHeader() {
	const { itemCount, openCart } = useCart();
	const { isAdmin } = useAuth();
	const [isUserAdmin, setIsUserAdmin] = useState(false);

	useEffect(() => {
		const checkAdminStatus = async () => {
			const adminStatus = await isAdmin();
			setIsUserAdmin(adminStatus);
		};
		checkAdminStatus();
	}, [isAdmin]);

	const linkStyle = ({ isActive }: { isActive: boolean }) =>
		`inline-flex items-center px-3 py-2 rounded-md text-base font-medium hover:text-[#C2EAE7] hover:underline transition-colors ${
			isActive ? "border-b-2 border-[#FFD59A]" : ""
		}`;

	return (
				<header className="bg-[#128A85] text-[#FFFBDE] shadow-lg sticky top-0 z-50 w-full">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<nav>
						<NavLink to="/shop" className={linkStyle}>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
							Shop
						</NavLink>
					</nav>
					<nav className="flex items-center space-x-6">
						{isUserAdmin ? (
							<NavLink to="/admin" className={linkStyle}>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
								Admin Dashboard
							</NavLink>
						) : (
							<button
								onClick={openCart}
																className="relative inline-flex items-center px-3 py-2 rounded-md text-base font-medium hover:text-[#C2EAE7] hover:underline transition-colors">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
								Cart
								{itemCount > 0 && (
									<span className="absolute -top-2 -right-3.5 flex items-center justify-center h-5 w-5 rounded-full bg-[#FFD59A] text-[#3A3A3A] text-xs font-bold">
										{itemCount}
									</span>
								)}
							</button>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
}
