import * as React from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Facebook, Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const newNavLinks = [
	{ name: "Blog", path: "#blog" },
	{ name: "Products", path: "#products" },
	{ name: "Resources", path: "#resources" },
	{ name: "Events", path: "#events" },
	{ name: "Community", path: "#community" },
];

const socialLinks = [
	{
		name: "WhatsApp",
		icon: FaWhatsapp,
		path: "https://wa.me/your-number",
	},
	{
		name: "Facebook",
		icon: Facebook,
		path: "https://facebook.com/your-page",
	},
	{
		name: "YouTube",
		icon: Youtube,
		path: "https://youtube.com/your-channel",
	},
];

export const Footer: React.FC = () => {
	const location = useLocation();
	const activePage = location.pathname.split("/")[1];

	return (
		<footer className="bg-slate-900 text-yellow-50">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="col-span-1">
						<h3 className="text-2xl font-semibold">
							CorePath International
						</h3>
						<p className="text-base text-yellow-50/80 mt-2">
							Building a brighter future, one value at a time.
						</p>
					</div>

					{/* Quick Links */}
					<div className="col-span-1">
						<h4 className="text-lg font-semibold mb-4">
							Quick Links
						</h4>
						<ul className="space-y-2">
							<li>
								<HashLink
									smooth
									to="/#home"
									className={`text-yellow-50/90 hover:text-white transition-colors ${
										activePage === "" ? "font-bold" : ""
									}`}>
									Home
								</HashLink>
							</li>
							<li>
								<HashLink
									smooth
									to="/#about"
									className={`text-yellow-50/90 hover:text-white transition-colors ${
										activePage === "about"
											? "font-bold"
											: ""
									}`}>
									About
								</HashLink>
							</li>
							<li>
								<HashLink
									smooth
									to="/#toolkit"
									className={`text-yellow-50/90 hover:text-white transition-colors ${
										activePage === "toolkit"
											? "font-bold"
											: ""
									}`}>
									The Toolkit
								</HashLink>
							</li>
							<li>
								<HashLink
									smooth
									to="/#training"
									className={`text-yellow-50/90 hover:text-white transition-colors ${
										activePage === "training"
											? "font-bold"
											: ""
									}`}>
									Training
								</HashLink>
							</li>
						</ul>
					</div>

					{/* New Navigation Links */}
					<div className="col-span-1">
						<h4 className="text-lg font-semibold mb-4">Explore</h4>
						<ul className="space-y-2">
							{newNavLinks.map(link => (
								<li key={link.name}>
									<HashLink
										smooth
										to={link.path}
										className="text-yellow-50/90 hover:text-yellow-50 transition-colors duration-300">
										{link.name}
									</HashLink>
								</li>
							))}
						</ul>
					</div>

					{/* Social Media Links */}
					<div className="col-span-1">
						<h4 className="text-lg font-semibold mb-4">
							Follow Us
						</h4>
						<div className="flex space-x-4">
							{socialLinks.map(social => (
								<a
									key={social.name}
									href={social.path}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={social.name}
									className="p-2 rounded-full bg-teal-100 text-teal-900/80 hover:bg-teal-300 hover:text-teal-900 icon-rotate-on-hover transition-all duration-300">
									<social.icon className="h-6 w-6" />
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className="mt-12 border-t border-yellow-50 pt-8 text-center">
					<p className="text-sm text-yellow-50/70">
						&copy; {new Date().getFullYear()} CorePath
						International. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};
