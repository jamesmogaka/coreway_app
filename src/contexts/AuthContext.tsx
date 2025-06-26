import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import type { Session, User as SupabaseUser } from "@supabase/supabase-js";

export type User = {
	id: string;
	email: string;
	full_name?: string;
	role?: string;
	created_at: string;
};

type AuthContextType = {
	user: User | null;
	session: Session | null;
	loading: boolean;
	isAdmin: () => Promise<boolean>;
	login: (
		email: string,
		password: string
	) => Promise<{
		error: Error | null;
		data: { user: SupabaseUser | null; session: Session | null } | null;
	}>;
	signUp: (
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) => Promise<{
		error: Error | null;
		data: { user: SupabaseUser | null; session: Session | null } | null;
	}>;
	logout: () => Promise<{ error: Error | null }>;
	resetPassword: (email: string) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getSession = async () => {
			const { data } = await supabase.auth.getSession();
			setSession(data.session);
			const currentUser = data.session?.user;
			setUser(
				currentUser
					? {
							id: currentUser.id,
							email: currentUser.email || "",
							created_at: currentUser.created_at,
					  }
					: null
			);
			setLoading(false);
		};

		getSession();

		const { data: authListener } = supabase.auth.onAuthStateChange(
			async (_event, session) => {
				setSession(session);
				const currentUser = session?.user;
				setUser(
					currentUser
						? {
								id: currentUser.id,
								email: currentUser.email || "",
								created_at: currentUser.created_at,
						  }
						: null
				);
				setLoading(false);
			}
		);

		return () => {
			authListener.subscription.unsubscribe();
		};
	}, []);

	const isAdmin = async () => {
		if (!session) return false;
		try {
			const decodedJwt = JSON.parse(atob(session.access_token.split(".")[1]));
			return decodedJwt.user_role === "admin";
		} catch (e) {
			console.error("Error decoding JWT:", e);
			return false;
		}
	};

	const login = async (email: string, password: string) => {
		return supabase.auth.signInWithPassword({ email, password });
	};

	const signUp = async (
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) => {
		return supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					first_name: firstName,
					last_name: lastName,
					full_name: `${firstName} ${lastName}`.trim(), // keep for backward compatibility
				},
			},
		});
	};

	const logout = async () => {
		return supabase.auth.signOut();
	};

	const resetPassword = async (email: string) => {
		return supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${window.location.origin}/update-password`,
		});
	};

	const value = {
		user,
		session,
		loading,
		isAdmin,
		login,
		signUp,
		logout,
		resetPassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
