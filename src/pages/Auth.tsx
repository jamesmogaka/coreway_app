import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (user) {
    return null; // or a loading spinner
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-[#096B68]">
      <div className="w-full max-w-md bg-[#129990] rounded-lg shadow-lg p-8">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 mb-6">
            <TabsTrigger
              value="login"
              className="pb-2 text-lg font-bold transition-colors duration-300 rounded-none text-[#C2EAE7] data-[state=active]:text-[#FFFBDE] data-[state=active]:border-b-2 data-[state=active]:border-[#FFD59A]"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="pb-2 text-lg font-bold transition-colors duration-300 rounded-none text-[#C2EAE7] data-[state=active]:text-[#FFFBDE] data-[state=active]:border-b-2 data-[state=active]:border-[#FFD59A]"
            >
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
}
