import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import type { BlogPost } from "../../types/blog";

type BlogTableProps = {
	posts: BlogPost[];
	onEdit: (post: BlogPost) => void;
	onDelete: (postId: string, postTitle: string) => void;
	onTogglePublish: (post: BlogPost) => void;
	onAddNew: () => void;
};

export function BlogTable({
	posts,
	onEdit,
	onDelete,
	onTogglePublish,
	onAddNew,
}: BlogTableProps) {
	return (
		<Card className="bg-[#129990] border-0 text-[#F5F5F5]">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-[#FFD59A]">Blog Posts</CardTitle>
				<Button
					onClick={onAddNew}
					className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]">
					Add New Post
				</Button>
			</CardHeader>
			<CardContent>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="rounded-md border border-white/20">
					<Table>
						<TableHeader>
							<TableRow className="border-b border-white/20 hover:bg-transparent">
								<TableHead className="text-[#FFD59A]">Title</TableHead>
								<TableHead className="text-[#FFD59A]">Status</TableHead>
								<TableHead className="text-right text-[#FFD59A]">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{posts.map(post => (
								<TableRow
									key={post.id}
									className="border-b-0 even:bg-white/5 hover:bg-white/10">
									<TableCell className="font-medium">
										{post.title}
									</TableCell>
									<TableCell>
										{post.is_published ? "Published" : "Draft"}
									</TableCell>
									<TableCell className="text-right space-x-2">
										<Button
											variant="ghost"
											size="sm"
											className="text-[#FFFBDE] hover:bg-[#C2EAE7] hover:text-[#3A3A3A]"
											onClick={() => onEdit(post)}>
											Edit
										</Button>
										<Button
											variant="ghost"
											size="sm"
											className="text-blue-400 hover:text-blue-300"
											onClick={() => onTogglePublish(post)}>
											{post.is_published ? "Unpublish" : "Publish"}
										</Button>
										<Button
											variant="ghost"
											size="sm"
											className="text-red-400 hover:text-red-300"
											onClick={() => onDelete(post.id, post.title)}>
											Delete
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</motion.div>
			</CardContent>
		</Card>
	);
}
