/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { BlogTable } from "@/components/admin/BlogTable";
import { BlogFormDialog } from "@/components/admin/BlogFormDialog";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import {
	getBlogPosts,
	createBlogPost,
	updateBlogPost,
	deleteBlogPost,
} from "@/lib/supabase/blog";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";
import { toast } from "sonner";

const BlogManagementPage: React.FC = () => {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(
		null
	);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [postToDelete, setPostToDelete] = useState<{ id: string; title: string } | null>(null);

	const fetchPosts = useCallback(async () => {
		try {
			setLoading(true);
			const allPosts = await getBlogPosts();
			setPosts(allPosts);
		} catch (error) {
			toast.error("Failed to fetch posts.");
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchPosts();
	}, [fetchPosts]);

	const handleAddNew = () => {
		setEditingPost({});
		setDialogOpen(true);
	};

	const handleEdit = (post: BlogPost) => {
		setEditingPost(post);
		setDialogOpen(true);
	};

	const handleDelete = (postId: string, postTitle: string) => {
		setPostToDelete({ id: postId, title: postTitle });
		setIsDeleteDialogOpen(true);
	};

	const handleConfirmDelete = async () => {
		if (!postToDelete) return;

		try {
			await deleteBlogPost(postToDelete.id);
			toast.success(`Post "${postToDelete.title}" deleted successfully.`);
			fetchPosts();
		} catch (error) {
			toast.error("Failed to delete post.");
		} finally {
			setIsDeleteDialogOpen(false);
			setPostToDelete(null);
		}
	};

	const handleTogglePublish = async (post: BlogPost) => {
		try {
			const updatedPost = await updateBlogPost(post.id, {
				is_published: !post.is_published,
			});
			toast.success(
				`Post "${post.title}" has been ${
					updatedPost.is_published ? "published" : "unpublished"
				}.`
			);
			fetchPosts();
		} catch {
			toast.error("Failed to update post status.");
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setEditingPost(prev => (prev ? { ...prev, [name]: value } : null));
	};

	const handlePublishChange = (is_published: boolean) => {
		setEditingPost(prev => (prev ? { ...prev, is_published } : null));
	};

	const handleFormSubmit = async () => {
		if (!editingPost) return;

		const { data: { user } } = await supabase.auth.getUser();

		if (!user) {
			toast.error("You must be logged in to create or update a post.");
			return;
		}

		try {
			const { title, summary, content, is_published } = editingPost;
			const postData = { title, summary, content, is_published, author_id: user.id };

			if (editingPost.id) {
				await updateBlogPost(editingPost.id, postData);
				toast.success("Post updated successfully!");
			} else {
				await createBlogPost(postData as Omit<BlogPost, "id" | "created_at" | "updated_at">);
				toast.success("Post created successfully!");
			}
			setDialogOpen(false);
			setEditingPost(null);
			fetchPosts();
		} catch (error) {
			toast.error("Failed to save post.");
		}
	};



	if (loading) {
		return <div className="text-center p-8">Loading blog posts...</div>;
	}

	return (
		<div className="p-4 md:p-8">
			<BlogTable
				posts={posts}
				onAddNew={handleAddNew}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onTogglePublish={handleTogglePublish}
			/>
			<BlogFormDialog
				open={isDialogOpen}
				onOpenChange={setDialogOpen}
				post={editingPost}
				onInputChange={handleInputChange}
				onPublishChange={handlePublishChange}
				onSubmit={handleFormSubmit}
				isEditing={!!editingPost?.id}
			/>
			{postToDelete && (
				<DeleteDialog
					open={isDeleteDialogOpen}
					onOpenChange={setIsDeleteDialogOpen}
					onConfirm={handleConfirmDelete}
					itemName={postToDelete.title}
				/>
			)}
		</div>
	);
};

export default BlogManagementPage;
