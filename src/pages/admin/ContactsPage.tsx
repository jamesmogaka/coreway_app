import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Contact = {
	id: string;
	name: string;
	email: string;
	message: string;
	status: "unread" | "read" | "replied";
	created_at: string;
};

export const ContactsPage = () => {
	const [contacts, setContacts] = useState<Contact[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		fetchContacts();
	}, []);

	async function fetchContacts() {
		try {
			setLoading(true);
			const { data, error } = await supabase
				.from("contact")
				.select("*")
				.order("created_at", { ascending: false });
			if (error) throw error;
			setContacts(data || []);
		} catch (err) {
			console.error("Error fetching contacts:", err);
			setError("Failed to load contacts");
		} finally {
			setLoading(false);
		}
	}
	const updateStatus = async (
		id: string,
		newStatus: "unread" | "read" | "replied"
	) => {
		try {
			const { error } = await supabase
				.from("contact")
				.update({ status: newStatus })
				.eq("id", id);

			if (error) throw error;

			// Update local state
			setContacts(
				contacts.map(contact =>
					contact.id === id
						? { ...contact, status: newStatus }
						: contact
				)
			);
		} catch (err) {
			console.error("Error updating status:", err);
			setError("Failed to update status");
		}
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString();
	};

	if (loading) {
		return <div className="p-8">Loading contacts...</div>;
	}

	if (error) {
		return <div className="p-8 text-red-500">{error}</div>;
	}

	return (
		<div className="p-8">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Contact Submissions</h1>
				<Button onClick={fetchContacts} variant="outline">
					Refresh
				</Button>
			</div>

			<div className="bg-white rounded-lg shadow overflow-hidden">
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Date
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Name
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Email
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Message
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{contacts.map(contact => (
								<tr
									key={contact.id}
									className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{formatDate(contact.created_at)}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{contact.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<a
											href={`mailto:${contact.email}`}
											className="text-blue-600 hover:text-blue-800">
											{contact.email}
										</a>
									</td>
									<td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
										<div className="line-clamp-2">
											{contact.message}
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm">
										<Select
											value={contact.status}
											onValueChange={(
												value:
													| "unread"
													| "read"
													| "replied"
											) =>
												updateStatus(contact.id, value)
											}>
											<SelectTrigger className="w-32">
												<SelectValue placeholder="Status" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="unread">
													Unread
												</SelectItem>
												<SelectItem value="read">
													Read
												</SelectItem>
												<SelectItem value="replied">
													Replied
												</SelectItem>
											</SelectContent>
										</Select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default ContactsPage;
