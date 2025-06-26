import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	// Controlled tab state for Tabs component
	const getTabFromURL = () => {
		const search = window.location.search;
		const params = new URLSearchParams(search);
		return params.get('tab') === 'signup' ? 'signup' : 'login';
	};
	const [tab, setTab] = useState(getTabFromURL());

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user, navigate]);

	useEffect(() => {
		const onPopState = () => {
			setTab(getTabFromURL());
		};
		window.addEventListener('popstate', onPopState);
		return () => window.removeEventListener('popstate', onPopState);
	}, []);

	if (user) {
		return null; // or a loading spinner
	}


	return (
		<div className="w-full min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md rounded-lg shadow-lg p-8">
				<Tabs value={tab} onValueChange={setTab} className="w-full">
					<TabsList
						className="flex w-full mb-8 rounded-full bg-gradient-to-r from-[#0f2027] via-[#2c5364] to-[#232526] shadow-xl border border-[#22292f] px-2 py-2 relative">
						<TabsTrigger
							value="login"
							className="flex-1 relative z-10 px-6 py-3 text-lg font-semibold tracking-wide rounded-full transition-all duration-300 text-[#129990] bg-transparent hover:bg-[#232526]/60 hover:text-[#FFD59A] focus:outline-none focus:ring-2 focus:ring-[#FFD59A] border-none data-[state=active]:bg-white data-[state=active]:text-[#232526] data-[state=active]:shadow-2xl data-[state=active]:-mt-2 data-[state=active]:mb-2 data-[state=active]:z-20 data-[state=active]:ring-2 data-[state=active]:ring-[#FFD59A] data-[state=active]:border-[#FFD59A]">
							Login
						</TabsTrigger>
						<TabsTrigger
							value="signup"
							className="flex-1 relative z-10 px-6 py-3 text-lg font-semibold tracking-wide rounded-full transition-all duration-300 text-[#129990] bg-transparent hover:bg-[#232526]/60 hover:text-[#FFD59A] focus:outline-none focus:ring-2 focus:ring-[#FFD59A] border-none data-[state=active]:bg-white data-[state=active]:text-[#232526] data-[state=active]:shadow-2xl data-[state=active]:-mt-2 data-[state=active]:mb-2 data-[state=active]:z-20 data-[state=active]:ring-2 data-[state=active]:ring-[#FFD59A] data-[state=active]:border-[#FFD59A]">
							Sign up
						</TabsTrigger>
					</TabsList>
					<TabsContent value="login">
						<LoginForm />
					</TabsContent>
					<TabsContent value="signup">
						<SignupForm />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};
