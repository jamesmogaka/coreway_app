import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

//
//This page contains both the login and signup forms on success in either of the operations
//you will be redirected to the dashboard
export function Auth() {
	return (
		<div className="w-screen h-screen flex items-center justify-center border">
			<Tabs defaultValue="signin" className="w-[400px]">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="signup">Signup</TabsTrigger>
					<TabsTrigger value="signin">Signin</TabsTrigger>
				</TabsList>
				<TabsContent value="signup">
					<SignupForm></SignupForm>
				</TabsContent>
				<TabsContent value="signin">
					<LoginForm></LoginForm>
				</TabsContent>
			</Tabs>
		</div>
	);
}
