import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import {
	FiSearch,
	FiChevronLeft,
	FiChevronRight,
	FiLoader,
	FiRefreshCw,
	FiUserX,
} from "react-icons/fi";

const ITEMS_PER_PAGE = 10;

interface User {
	id: string;
	email: string;
	created_at: string;
	last_sign_in_at?: string;
	full_name?: string;
	user_role?: "admin" | "user";
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
	const [refreshing, setRefreshing] = useState(false);
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
			const { data, error } = await supabase
				.from("profiles")
				.select(
					"id, email, full_name, created_at, last_sign_in_at, user_role"
				)
				.order("created_at", { ascending: false });

			if (error) throw error;

			setUsers(data || []);
		} catch (error) {
			toast.error(
				(error instanceof Error && error.message) ||
					"Failed to fetch users."
			);
		} finally {
			setDataLoading(false);
			setRefreshing(false);
		}
	}, [isAdmin]);

	useEffect(() => {
		if (!authLoading) {
			fetchUsers();
		}
	}, [authLoading, fetchUsers]);

	const handleUpdateRole = async (
		userId: string,
		newRole: "admin" | "user"
	) => {
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
			const { error } = await supabase
				.from("profiles")
				.update({ user_role: newRole })
				.eq("id", userId);

			if (error) {
				setUsers(originalUsers);
				throw error;
			}

			toast.success(`User role has been updated to ${newRole}.`);
		} catch (error) {
			toast.error(
				(error instanceof Error && error.message) ||
					"Failed to update user role."
			);
		}
	};

	const filteredUsers = useMemo(() => {
		return users.filter(user => {
			const searchTerm = filters.search.toLowerCase();
			const nameMatch = user.full_name
				?.toLowerCase()
				.includes(searchTerm);
			const emailMatch = user.email.toLowerCase().includes(searchTerm);

			const roleMatch =
				filters.role === "all" || user.user_role === filters.role;

			const lastActive = user.last_sign_in_at
				? new Date(user.last_sign_in_at)
				: null;
			const statusMatch =
				filters.status === "all" ||
				(filters.status === "active" ? !!lastActive : !lastActive);

			return (nameMatch || emailMatch) && roleMatch && statusMatch;
		});
	}, [users, filters]);

	const paginatedUsers = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		const end = start + ITEMS_PER_PAGE;
		return filteredUsers.slice(start, end);
	}, [filteredUsers, currentPage]);

	const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

	const handleRefresh = () => {
		setRefreshing(true);
		fetchUsers();
	};

	const handleFilterChange = (filter: Partial<UserFilters>) => {
		setFilters(prev => ({ ...prev, ...filter }));
		setCurrentPage(1);
	};

	const handlePageChange = (page: number) => {
		if (page > 0 && page <= totalPages) {
			setCurrentPage(page);
		}
	};

	if (authLoading || dataLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<FiLoader className="w-12 h-12 text-blue-500 animate-spin" />
			</div>
		);
	}

	if (!isAdmin) {
		return (
			<div className="flex flex-col items-center justify-center h-screen text-center">
				<FiUserX className="w-16 h-16 mb-4 text-red-500" />
				<h1 className="text-2xl font-bold">Access Denied</h1>
				<p className="text-gray-600">
					You do not have permission to view this page.
				</p>
			</div>
		);
	}

	return (
		<div className="p-6">
			<header className="flex items-center justify-between pb-4 mb-4 border-b">
				<h1 className="text-3xl font-bold">User Management</h1>
				<button
					onClick={handleRefresh}
					disabled={refreshing}
					className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
					{refreshing ? (
						<FiLoader className="mr-2 animate-spin" />
					) : (
						<FiRefreshCw className="mr-2" />
					)}
					Refresh
				</button>
			</header>

			<div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
				<div className="relative md:col-span-1">
					<FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
					<input
						type="text"
						placeholder="Search by name or email..."
						value={filters.search}
						onChange={e =>
							handleFilterChange({ search: e.target.value })
						}
						className="w-full py-2 pl-10 pr-4 border rounded-md"
					/>
				</div>
				<select
					value={filters.role}
					onChange={e =>
						handleFilterChange({
							role: e.target.value as UserFilters["role"],
						})
					}
					className="w-full p-2 border rounded-md">
					<option value="all">All Roles</option>
					<option value="admin">Admins</option>
					<option value="user">Users</option>
				</select>
				<select
					value={filters.status}
					onChange={e =>
						handleFilterChange({
							status: e.target.value as UserFilters["status"],
						})
					}
					className="w-full p-2 border rounded-md">
					<option value="all">All Statuses</option>
					<option value="active">Active</option>
					<option value="inactive">Inactive</option>
				</select>
			</div>

			<div className="overflow-x-auto bg-white rounded-lg shadow">
				<table className="min-w-full leading-normal">
					<thead>
						<tr>
							<th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
								User
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
								Role
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
								Status
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
								Last Active
							</th>
							<th className="px-5 py-3 text-left text-xs font-semibold text-gray-600 uppercase bg-gray-100 border-b-2 border-gray-200">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{paginatedUsers.length > 0 ? (
							paginatedUsers.map(user => (
								<tr key={user.id}>
									<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
										<div className="flex items-center">
											<div className="ml-3">
												<p className="font-semibold text-gray-900 whitespace-no-wrap">
													{user.full_name || "N/A"}
												</p>
												<p className="text-gray-600 whitespace-no-wrap">
													{user.email}
												</p>
											</div>
										</div>
									</td>
									<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
										<span
											className={`px-2 py-1 font-semibold leading-tight ${
												user.user_role === "admin"
													? "text-green-700 bg-green-100"
													: "text-gray-700 bg-gray-100"
											} rounded-full`}>
											{user.user_role}
										</span>
									</td>
									<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
										<span
											className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
												user.last_sign_in_at
													? "text-green-900"
													: "text-red-900"
											}`}>
											<span
												aria-hidden
												className={`absolute inset-0 ${
													user.last_sign_in_at
														? "bg-green-200"
														: "bg-red-200"
												} opacity-50 rounded-full`}></span>
											<span className="relative">
												{user.last_sign_in_at
													? "Active"
													: "Inactive"}
											</span>
										</span>
									</td>
									<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
										{user.last_sign_in_at
											? new Date(
													user.last_sign_in_at
											  ).toLocaleDateString()
											: "Never"}
									</td>
									<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
										{user.id === currentUser?.id ? (
											<span className="text-sm font-semibold text-gray-500">
												N/A (You)
											</span>
										) : (
											<select
												value={user.user_role || "user"}
												onChange={e =>
													handleUpdateRole(
														user.id,
														e.target.value as
															| "admin"
															| "user"
													)
												}
												className="p-1 text-sm border rounded-md">
												<option value="user">
													User
												</option>
												<option value="admin">
													Admin
												</option>
											</select>
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={5}
									className="py-10 text-center text-gray-500">
									No users found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{totalPages > 1 && (
				<div className="flex items-center justify-between px-4 py-3 bg-white border-t rounded-b-lg shadow">
					<span className="text-sm text-gray-700">
						Page {currentPage} of {totalPages}
					</span>
					<div className="flex items-center">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="px-3 py-1 mr-2 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50">
							<FiChevronLeft />
						</button>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="px-3 py-1 text-sm font-semibold text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50">
							<FiChevronRight />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
