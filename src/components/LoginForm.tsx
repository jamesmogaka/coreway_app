import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useState } from "react";

//Pre-buid components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

//validation schema and its corresponiding input types
import { login_schema, type login_form_values } from "@/lib/validations/auth";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

export function LoginForm() {
	const { login } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	// Form definition
	const form = useForm<login_form_values>({
		resolver: zodResolver(login_schema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: login_form_values) {
		setIsLoading(true);
		try {
			const { error } = await login(values.email, values.password);

			if (error) {
				throw error;
			}

			toast({
				title: "Success!",
				description: "You have been successfully logged in.",
				type: "success",
				duration: 10000,
			});
			// Redirect to dashboard or home page
			navigate("/shop");
		} catch (error) {
			form.setError("root", {
				type: "manual",
				message:
					error instanceof Error
						? error.message
						: "An error occurred while logging in.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-sm">
				{/* Email Field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-[#FFFBDE] font-bold">Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="johndoe@example.com"
									className="bg-[#90D1CA] text-[#3A3A3A] border-0 focus:ring-2 focus:ring-[#FFD59A] transition-shadow duration-300 placeholder:text-gray-600 rounded-md"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-300" />
						</FormItem>
					)}
				/>

				{/* Password Field */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between">
								<FormLabel className="text-[#FFFBDE] font-bold">Password</FormLabel>
								<button
									type="button"
									className="font-medium text-[#FFFBDE] hover:underline"
									onClick={() =>
										navigate("/forgot-password")
									}>
									Forgot password?
								</button>
							</div>
							<FormControl>
								<Input
									type="password"
									placeholder="••••••••"
									className="bg-[#90D1CA] text-[#3A3A3A] border-0 focus:ring-2 focus:ring-[#FFD59A] transition-shadow duration-300 placeholder:text-gray-600 rounded-md"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage className="text-red-300" />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
										<div className="font-medium text-red-300">
						{form.formState.errors.root.message}
					</div>
				)}

				<Button
					type="submit"
					className="w-full bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60] rounded-md transition-colors duration-300 font-bold"
					disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Signing in...
						</>
					) : (
						"Sign in"
					)}
				</Button>
			</form>
		</Form>
	);
}
