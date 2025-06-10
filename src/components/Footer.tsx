import * as react from "react";
import type { FooterProps } from "../components";

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
