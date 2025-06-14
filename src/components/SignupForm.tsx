import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { signup_schema, type signup_form_values } from "@/lib/validations/auth";
import { useAuth } from "@/contexts/AuthContext";

export function SignupForm() {
	const { signUp } = useAuth();
	const { toast } = useToast();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	// Create a form
	const form = useForm<signup_form_values>({
		resolver: zodResolver(signup_schema),
		defaultValues: {
			email: "",
			password: "",
			full_name: "",
		},
	});

	// Submit handler for user registration.
	async function onSubmit(values: signup_form_values) {
		setIsLoading(true);
		try {
			const { error } = await signUp(
				values.email,
				values.password,
				values.full_name
			);

			if (error) {
				throw error;
			}
			toast({
				title: "Success!",
				description: "Please check your email for a confirmation link.",
				type: "success",
				duration: 10000,
			});

			// Redirect to login or a success page
			navigate("/auth");
		} catch (error) {
			// If there's an error, set the error message in the form
			form.setError("root", {
				type: "manual",
				message:
					error instanceof Error
						? error.message
						: "An unknown error occurred during sign-up.",
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{/* Full Name Field */}
				<FormField
					control={form.control}
					name="full_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Full Name</FormLabel>
							<FormControl>
								<Input
									placeholder="John Doe"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Email Field */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="john@example.com"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
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
								<FormLabel>Password</FormLabel>
								<FormDescription className="text-xs">
									At least 8 characters
								</FormDescription>
							</div>
							<FormControl>
								<Input
									type="password"
									placeholder="••••••••"
									disabled={isLoading}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.errors.root && (
					<div className="text-sm font-medium text-destructive">
						{form.formState.errors.root.message}
					</div>
				)}

				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Creating account...
						</>
					) : (
						"Sign up"
					)}
				</Button>
			</form>
		</Form>
	);
}
