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
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
									placeholder="johndoe@example.com"
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
								<button
									type="button"
									className="text-sm font-medium text-primary hover:underline"
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
