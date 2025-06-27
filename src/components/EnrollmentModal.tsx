import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface EnrollmentModalProps {
	open: boolean;
	onClose: () => void;
	courseId: string;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
	open,
	onClose,
	courseId,
}) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const [checkingAuth, setCheckingAuth] = useState(true);
	const [user, setUser] = useState<User | null>(null);

	const modalRef = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		let ignore = false;
		setCheckingAuth(true);
		supabase.auth.getUser().then(({ data }) => {
			if (ignore) return;
			setUser(data?.user || null);
			setCheckingAuth(false);
			if (data?.user) {
				// User is logged in, enroll immediately
				supabase
					.from("enrollments")
					.insert([
						{
							course_id: courseId,
							user_id: data.user.id,
							email: data.user.email,
							first_name:
								data.user.user_metadata?.first_name || "",
							last_name: data.user.user_metadata?.last_name || "",
						},
					])
					.then(({ error }) => {
						if (error) {
							setError(error.message);
						} else {
							setSuccess(true);
						}
					});
			}
		});
		return () => {
			ignore = true;
		};
	}, [open, courseId]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);
		const { error } = await supabase.from("enrollments").insert([
			{
				course_id: courseId,
				email,
				first_name: firstName,
				last_name: lastName,
			},
		]);
		setLoading(false);
		if (error) {
			setError(error.message);
		} else {
			setSuccess(true);
			setFirstName("");
			setLastName("");
			setEmail("");
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-30 flex items-center justify-center">
			{/* Dull overlay */}
			<div
				className="absolute inset-0 bg-transparent transition-opacity duration-200 z-0"
				onClick={onClose}
			/>
			{/* Modal dialog */}
			<div
				ref={modalRef}
				className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative z-10"
				onClick={e => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
					&times;
				</button>
				<h2 className="text-2xl font-bold mb-4 text-teal-800">
					Enroll in Course
				</h2>
				{checkingAuth ? (
					<div className="text-center text-teal-700">
						Checking login status...
					</div>
				) : success ? (
					<div className="text-green-700 font-semibold text-center mb-4">
						Enrollment successful!
					</div>
				) : user ? null : (
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={e => setFirstName(e.target.value)}
							className="w-full border border-teal-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
							required
						/>
						<input
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={e => setLastName(e.target.value)}
							className="w-full border border-teal-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
							required
						/>
						<input
							type="email"
							placeholder="Email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="w-full border border-teal-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
							required
						/>
						{error && (
							<div className="text-red-600 text-sm">{error}</div>
						)}
						<button
							type="submit"
							className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
							disabled={loading}>
							{loading ? "Enrolling..." : "Submit Enrollment"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
};
