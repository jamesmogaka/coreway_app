import { Link } from "react-router-dom";
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

	return (
		<header className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link
						to="/shop"
						className="flex-shrink-0 flex items-center">
						<span className="text-xl font-bold text-gray-900">
							Shop
						</span>
					</Link>
					<nav className="flex items-center space-x-4">
						{isUserAdmin ? (
							<Link
								to="/admin"
								className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
								Admin Dashboard
							</Link>
						) : (
							<button
								onClick={openCart}
								className="relative inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-5 w-5 mr-1"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
								Cart
								{itemCount > 0 && (
									<span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full bg-blue-600 text-white text-xs">
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
