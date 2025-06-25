import * as React from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
	Facebook,
	Mail,
	MapPin,
	Phone,
	Youtube,
	MessageSquare,
} from "lucide-react";
import { Button } from "./ui/button";

const newNavLinks = [
	{ name: "Blog", path: "/blog#" },
	{ name: "Products", path: "/products#" },
	{ name: "Resources", path: "/resources#" },
	{ name: "Events", path: "/events#" },
	{ name: "Community", path: "/community#" },
];

const socialLinks = [
	{
		name: "WhatsApp",
		icon: MessageSquare,
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

const FooterComponent: React.FC = () => {
	const location = useLocation();
	const activePage = location.pathname.split("/")[1];

	return (
		<footer className="bg-slate-900 text-yellow-50">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-5 gap-8">
					{/* Company Info */}
					<div className="col-span-1">
						<h3 className="text-2xl font-semibold">
							CorePath Impact
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

					{/* Why VDC Tool */}
					<div className="col-span-1">
						<h4 className="text-lg font-semibold mb-4">
							Why VDC Tool
						</h4>
						<ul className="space-y-2">
							<li>
								<HashLink
									smooth
									to="/about-details#"
									className="text-yellow-50/90 hover:text-white transition-colors">
									About
								</HashLink>
							</li>
							<li>
								<HashLink
									smooth
									to="/vdc-parenting#"
									className="text-yellow-50/90 hover:text-white transition-colors">
									VDC-Parenting
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
						<div className="space-y-8">
							<div>
								<h3 className="text-xl sm:text-2xl font-bold text-yellow-50 mb-6">
									CorePath Impact
								</h3>
								<div className="space-y-4">
									<div className="flex items-center space-x-4">
										<div className="bg-blue-100 p-3 rounded-full">
											<Mail className="h-6 w-6 text-blue-600" />
										</div>
										<div>
											<p className="font-semibold text-yellow-50">
												Email
											</p>
											<p className="text-yellow-50">
												info@corepathimpact.org
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-4">
										<div className="bg-orange-100 p-3 rounded-full">
											<Phone className="h-6 w-6 text-orange-600" />
										</div>
										<div>
											<p className="font-semibold text-yellow-50">
												Phone
											</p>
											<p className="text-yellow-50">
												+254 720 979570
											</p>
										</div>
									</div>

									<div className="flex items-center space-x-4">
										<div className="bg-green-100 p-3 rounded-full">
											<MapPin className="h-6 w-6 text-green-600" />
										</div>
										<div>
											<p className="font-semibold text-yellow-50">
												Location
											</p>
											<p className="text-yellow-50">
												Nairobi, Kenya
											</p>
										</div>
									</div>
								</div>
							</div>

							<h4 className="text-lg font-semibold mb-4">
								Follow Us
							</h4>
							<div className="flex space-x-4">
								{socialLinks.map(social => (
									<Button
										variant="outline"
										size="sm"
										className="p-2 bg-teal-100 text-teal-900/80 hover:bg-teal-300 hover:text-teal-900 icon-rotate-on-hover transition-all duration-300"
										key={social.name}>
										<a
											href={social.path}
											target="_blank"
											rel="noopener noreferrer"
											aria-label={social.name}>
											<social.icon className="h-6 w-6" />
										</a>
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Footer Bottom */}
				<div className="mt-12 border-t border-yellow-50 pt-8 text-center">
					<p className="text-sm text-yellow-50/70">
						&copy; {new Date().getFullYear()} CorePath Impact. All
						rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
};

// Memoized export to avoid unnecessary re-renders
export const Footer = React.memo(FooterComponent);
