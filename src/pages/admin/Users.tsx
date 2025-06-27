import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
	Search,
	ChevronLeft,
	ChevronRight,
	Loader,
	Shield,
} from "lucide-react";
import { FiUser } from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

// Type definitions for Supabase data
interface Role {
	name: string;
}

interface UserRole {
	roles: Role[] | null;
}

interface FetchedUser {
	id: string;
	first_name: string | null;
	last_name: string | null;
	county: string | null;
	sub_county: string | null;
	ward: string | null;
	street_address: string | null;
	phone_number: string | null;
	user_roles: UserRole[];
}

// Combined User type for the component state
interface User {
	id: string;
	email: string;
	created_at: string;
	last_sign_in_at?: string;
	full_name?: string;
	user_role?: "admin" | "user";
	county?: string | null;
	sub_county?: string | null;
	ward?: string | null;
	street_address?: string | null;
	phone_number?: string | null;
}

interface UserFilters {
	search: string;
	role: "all" | "admin" | "user";
	status: "all" | "active" | "inactive";
}

export default function UsersPage() {
	const { isAdmin, user: currentUser, loading: authLoading } = useAuth();
	const [users, setUsers] = useState<User[]>([]);
	const [dataLoading, setDataLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [filters, setFilters] = useState<UserFilters>({
		search: "",
		role: "all",
		status: "all",
	});

	const fetchUsers = useCallback(async () => {
		if (!isAdmin) {
			setDataLoading(false);
			return;
		}

		try {
			setDataLoading(true);

			const { data, error } = await supabase.from("profiles").select(`
				id,
				first_name,
				last_name,
				county,
				sub_county,
				ward,
				street_address,
				phone_number,
				user_roles (
					roles (
						name
					)
				)
			`);
			if (error) throw error;

			if (data) {
				const formattedUsers: User[] = (data as FetchedUser[]).map(
					profile => {
						const roles = profile.user_roles
							.flatMap(ur => ur.roles || [])
							.map(role => role.name)
							.filter((name): name is string => !!name);
						const userRole = roles.length > 0 ? roles[0] : "user";

						return {
							id: profile.id,
							email: "", // email is not available in profiles table
							created_at: "", // created_at is not available in profiles table
							last_sign_in_at: undefined, // last_sign_in_at is not available in profiles table
							full_name: `${profile.first_name || ""} ${
								profile.last_name || ""
							}`.trim(),
							user_role: userRole as "admin" | "user",
							county: profile.county,
							sub_county: profile.sub_county,
							ward: profile.ward,
							street_address: profile.street_address,
							phone_number: profile.phone_number,
						};
					}
				);
				setUsers(formattedUsers);
			} else {
				setUsers([]);
			}
		} catch (error) {
			toast.error(
				(error instanceof Error && error.message) ||
					"Failed to fetch users."
			);
		} finally {
			setDataLoading(false);
		}
	}, [isAdmin]);

	useEffect(() => {
		if (!authLoading) {
			fetchUsers();
		}
	}, [authLoading, fetchUsers]);

	const handleUpdateRole = useCallback(
		async (userId: string, newRole: "admin" | "user") => {
			if (currentUser?.id === userId) {
				toast.error("You cannot change your own role.");
				return;
			}

			const originalUsers = [...users];
			setUsers(currentUsers =>
				currentUsers.map(u =>
					u.id === userId ? { ...u, user_role: newRole } : u
				)
			);

			try {
				// 1. Get the role ID for 'admin'
				const { data: roleData, error: roleError } = await supabase
					.from("roles")
					.select("id")
					.eq("name", "admin")
					.single();

				if (roleError)
					throw new Error("Could not find the admin role.");
				const adminRoleId = roleData.id;

				if (newRole === "admin") {
					// Add admin role
					const { error: insertError } = await supabase
						.from("user_roles")
						.insert({ user_id: userId, role_id: adminRoleId });
					if (insertError) throw insertError;
					toast.success("User promoted to admin.");
				} else {
					// Remove admin role
					const { error: deleteError } = await supabase
						.from("user_roles")
						.delete()
						.match({ user_id: userId, role_id: adminRoleId });
					if (deleteError) throw deleteError;
					toast.success("User demoted to regular user.");
				}
			} catch (error) {
				setUsers(originalUsers); // Revert optimistic update on error
				toast.error(
					(error instanceof Error && error.message) ||
						"Failed to update user role."
				);
			}
		},
		[users, currentUser]
	);

	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			const searchTerm = filters.search.toLowerCase();
			const nameMatch = user.full_name
				?.toLowerCase()
				.includes(searchTerm);
			const emailMatch = user.email.toLowerCase().includes(searchTerm);
			const phoneMatch = user.phone_number?.includes(searchTerm);

			const roleMatch =
				filters.role === "all" || user.user_role === filters.role;

			const lastActive = user.last_sign_in_at
				? new Date(user.last_sign_in_at)
				: null;
			const statusMatch =
				filters.status === "all" ||
				(filters.status === "active" ? !!lastActive : !lastActive);

			return (
				(nameMatch || emailMatch || phoneMatch) &&
				roleMatch &&
				statusMatch
			);
		});
	}, [users, filters]);

	const paginatedUsers = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		return filteredUsers.slice(start, end);
	}, [filteredUsers, currentPage]);

	const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

	const handleFilterChange = useCallback((filter: Partial<UserFilters>) => {
		setFilters(prev => ({ ...prev, ...filter }));
		setCurrentPage(1);
	}, []);

	const handlePageChange = useCallback(
		(page: number) => {
			if (page > 0 && page <= totalPages) {
				setCurrentPage(page);
			}
		},
		[totalPages]
	);

	const handleRoleToggleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			const { userId, userRole } = event.currentTarget.dataset;
			if (userId && userRole) {
				handleUpdateRole(
					userId,
					userRole === "admin" ? "user" : "admin"
				);
			}
		},
		[handleUpdateRole]
	);

	const handlePrevPage = useCallback(() => {
		handlePageChange(currentPage - 1);
	}, [currentPage, handlePageChange]);

	const handleNextPage = useCallback(() => {
		handlePageChange(currentPage + 1);
	}, [currentPage, handlePageChange]);

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			handleFilterChange({ search: e.target.value });
		},
		[handleFilterChange]
	);

	const onRoleFilterChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			handleFilterChange({ role: e.target.value as UserFilters["role"] });
		},
		[handleFilterChange]
	);

	const handleStatusFilterChange = useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			handleFilterChange({
				status: e.target.value as UserFilters["status"],
			});
		},
		[handleFilterChange]
	);

	if (authLoading || dataLoading) {
		return (
			<div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
				<Loader className="w-12 h-12 text-[#FFD59A] animate-spin" />
			</div>
		);
	}

	if (!isAdmin) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
				<h1 className="text-3xl font-bold text-red-500">
					Access Denied
				</h1>
				<p className="mt-4 text-lg text-gray-300">
					You do not have the necessary permissions to view this page.
				</p>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-8  text-[#F5F5F5] min-h-screen">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-[#FFD59A]">
						User Management
					</h1>
					{/* You can add a 'Create User' button here if needed */}
				</div>

				{/* Filters */}
				<div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6 p-4 bg-black/20 rounded-lg border border-gray-700">
					<div className="relative md:col-span-2">
						<Search className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							placeholder="Search by name or email..."
							value={filters.search}
							onChange={handleSearchChange}
							className="w-full py-2 pl-10 pr-4 bg-black/20 border border-[#C2EAE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD59A] text-[#F5F5F5] placeholder:text-gray-400"
						/>
					</div>
					<div className="relative md:col-span-2">
						<Search className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<select
							name="role"
							value={filters.role}
							onChange={onRoleFilterChange}
							className="w-full pl-10 pr-4 py-2 bg-black/20 border border-[#C2EAE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD59A] text-[#F5F5F5]">
							<option value="all">All Roles</option>
							<option value="admin">Admin</option>
							<option value="user">User</option>
						</select>
					</div>
					<div className="relative md:col-span-2">
						<Shield className="absolute top-1/2 left-3 -translate-y-1/2 h-5 w-5 text-gray-400" />
						<select
							name="status"
							value={filters.status}
							onChange={handleStatusFilterChange}
							className="w-full pl-10 pr-4 py-2 bg-black/20 border border-[#C2EAE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD59A] text-[#F5F5F5]">
							<option value="all">All Statuses</option>
							<option value="active">Active</option>
							<option value="inactive">Inactive</option>
						</select>
					</div>
				</div>

				<div className="overflow-hidden bg-[#129990] border border-white/20 rounded-lg shadow">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase bg-black/20 border-b-2 border-gray-700">
									User
								</th>
								<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase bg-black/20 border-b-2 border-gray-700">
									Location
								</th>
								<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase bg-black/20 border-b-2 border-gray-700">
									Role
								</th>
								<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase bg-black/20 border-b-2 border-gray-700">
									Status
								</th>
								<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase bg-black/20 border-b-2 border-gray-700">
									Last Active
								</th>
								<th className="px-5 py-3 text-xs font-semibold tracking-wider text-left text-gray-400 uppercase bg-black/20 border-b-2 border-gray-700">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-black/10">
							{paginatedUsers.length > 0 ? (
								paginatedUsers.map(user => (
									<tr
										key={user.id}
										className="border-b border-gray-700 hover:bg-black/20">
										<td className="px-5 py-5 text-sm">
											<div className="flex items-center">
												<div className="flex-shrink-0">
													<div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-600 rounded-full">
														<FiUser className="w-6 h-6 text-gray-300" />
													</div>
												</div>
												<div className="ml-4">
													<p className="font-semibold text-[#F5F5F5]">
														{user.full_name ||
															"N/A"}
													</p>
													<p className="text-sm text-gray-400">
														{user.email}
													</p>
													<p className="text-sm text-gray-500">
														{user.phone_number ||
															"No phone"}
													</p>
												</div>
											</div>
										</td>
										<td className="px-5 py-5 text-sm">
											<p className="text-[#F5F5F5]">{`${
												user.street_address || ""
											}${
												user.street_address && user.ward
													? ", "
													: ""
											}${user.ward || ""}`}</p>
											<p className="text-sm text-gray-400">{`${
												user.sub_county || ""
											}${
												user.sub_county && user.county
													? ", "
													: ""
											}${user.county || ""}`}</p>
										</td>
										<td className="px-5 py-5 text-sm">
											<span
												className={`relative inline-block px-3 py-1 font-semibold leading-tight capitalize ${
													user.user_role === "admin"
														? "text-orange-400"
														: "text-green-300"
												}`}>
												<span
													aria-hidden
													className={`absolute inset-0 ${
														user.user_role ===
														"admin"
															? "bg-orange-400/20"
															: "bg-green-400/20"
													} rounded-full opacity-50`}></span>
												<span className="relative">
													{user.user_role}
												</span>
											</span>
										</td>
										<td className="px-5 py-5 text-sm">
											<span
												className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
													user.last_sign_in_at
														? "text-green-300"
														: "text-gray-400"
												}`}>
												<span
													aria-hidden
													className={`absolute inset-0 ${
														user.last_sign_in_at
															? "bg-green-400/20"
															: "bg-gray-400/20"
													} rounded-full opacity-50`}></span>
												<span className="relative">
													{user.last_sign_in_at
														? "Active"
														: "Inactive"}
												</span>
											</span>
										</td>
										<td className="px-5 py-5 text-sm">
											<p className="text-gray-400 whitespace-no-wrap">
												{user.last_sign_in_at
													? new Date(
															user.last_sign_in_at
													  ).toLocaleDateString()
													: "Never"}
											</p>
										</td>
										<td className="px-5 py-5 text-sm">
											{user.id === currentUser?.id ? (
												<span className="text-sm font-semibold text-gray-500">
													N/A (You)
												</span>
											) : (
												<button
													onClick={
														handleRoleToggleClick
													}
													data-user-id={user.id}
													data-user-role={
														user.user_role
													}
													className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFD59A] ${
														user.user_role ===
														"admin"
															? "bg-green-500"
															: "bg-gray-600"
													}`}>
													<span
														className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
															user.user_role ===
															"admin"
																? "translate-x-6"
																: "translate-x-1"
														}`}
													/>
												</button>
											)}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="py-10 text-center text-gray-400">
										No users found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>

				{totalPages > 1 && (
					<div className="flex items-center justify-between px-4 py-3 bg-white border-t rounded-b-lg shadow">
						<p className="text-sm text-gray-400">
							Page {currentPage} of {totalPages}
						</p>
						<div className="flex items-center">
							<button
								onClick={handlePrevPage}
								disabled={currentPage === 1}
								className="w-full px-4 py-2 bg-black/20 border border-[#C2EAE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD59A] text-[#F5F5F5]">
								<ChevronLeft />
							</button>
							<button
								onClick={handleNextPage}
								disabled={currentPage === totalPages}
								className="w-full px-4 py-2 bg-black/20 border border-[#C2EAE7] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD59A] text-[#F5F5F5]">
								<ChevronRight />
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
