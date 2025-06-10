import * as react from "react";
import { Link } from "react-router-dom";

export const Footer: react.FC = () => {
	const activePage = location.pathname.split("/")[1];

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
						<h3 className="text-lg font-bold mb-2">Quick Links</h3>
						<ul className="mt-2 space-y-2">
							<li>
								<Link
									to="/"
									className={`text-gray-400 hover:text-white ${
										activePage === "" ? "active" : ""
									}`}>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className={`text-gray-400 hover:text-white ${
										activePage === "about" ? "active" : ""
									}`}>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/toolkit"
									className={`text-gray-400 hover:text-white ${
										activePage === "toolkit" ? "active" : ""
									}`}>
									The Toolkit
								</Link>
							</li>
							<li>
								<Link
									to="/training"
									className={`text-gray-400 hover:text-white ${
										activePage === "training"
											? "active"
											: ""
									}`}>
									Training
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};
