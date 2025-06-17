import * as react from "react";
import { Link, useLocation } from "react-router-dom";

export const Footer: react.FC = () => {
	const location = useLocation();
	const activePage = location.pathname.split("/")[1];

	return (
		<footer className="bg-[#90D1CA] text-[#096B68]">
			<div className="container mx-auto px-6 py-8">
				<div className="sm:flex sm:justify-between">
					<div className="mb-4 sm:mb-0">
												<h3 className="text-2xl font-semibold">
							CorePath International
						</h3>
												<p className="text-base text-[#096B68]/80 mt-2">
							Building a brighter future, one value at a time.
						</p>
					</div>
					<div>
												<h3 className="text-2xl font-semibold mb-2">Quick Links</h3>
												<ul className="mt-2 space-y-2 text-base">
							<li>
								<Link
									to="/"
									className={`text-[#096B68]/90 hover:text-[#096B68] transition-colors ${
										activePage === "" ? "font-bold" : ""
									}`}>
									Home
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className={`text-[#096B68]/90 hover:text-[#096B68] transition-colors ${
										activePage === "about"
											? "font-bold"
											: ""
									}`}>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/toolkit"
									className={`text-[#096B68]/90 hover:text-[#096B68] transition-colors ${
										activePage === "toolkit"
											? "font-bold"
											: ""
									}`}>
									The Toolkit
								</Link>
							</li>
							<li>
								<Link
									to="/training"
									className={`text-[#096B68]/90 hover:text-[#096B68] transition-colors ${
										activePage === "training"
											? "font-bold"
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
