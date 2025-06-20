/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { BlogTable } from "@/components/admin/BlogTable";
import { BlogFormDialog } from "@/components/admin/BlogFormDialog";
import {
	getBlogPosts,
	createBlogPost,
	updateBlogPost,
	deleteBlogPost,
} from "@/lib/supabase/blog";
import type { BlogPost } from "@/types/blog";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const BlogManagementPage: React.FC = () => {
	const { user } = useAuth();
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(
		null
	);

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

	const handleDelete = async (postId: string, postTitle: string) => {
		if (window.confirm(`Are you sure you want to delete "${postTitle}"?`)) {
			try {
				await deleteBlogPost(postId);
				toast.success(`Post "${postTitle}" deleted successfully.`);
				fetchPosts();
			} catch {
				toast.error("Failed to delete post.");
			}
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

	const handleFormSubmit = async () => {
		if (!editingPost || !user) return;
		try {
			if ("id" in editingPost && editingPost.id) {
				// Update existing post
				const { id, created_at, updated_at, ...updateData } = editingPost as BlogPost;
				await updateBlogPost(id, { ...updateData, author_id: user.id });
				toast.success("Post updated successfully!");
			} else {
				// Create new post
				const newPostData = { ...editingPost, author_id: user.id };
				await createBlogPost(
					newPostData as Omit<
						BlogPost,
						"id" | "created_at" | "updated_at"
					>
				);
				toast.success("Post created successfully!");
			}
			setDialogOpen(false);
			setEditingPost(null);
			fetchPosts();
		} catch (error) {
			toast.error("Failed to save post.");
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setEditingPost(prev => (prev ? { ...prev, [name]: value } : null));
	};

	const handlePublishChange = (is_published: boolean) => {
		setEditingPost(prev => (prev ? { ...prev, is_published } : null));
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
				isEditing={!!(editingPost && "id" in editingPost)}
				onSubmit={handleFormSubmit}
				onInputChange={handleInputChange}
				onPublishChange={handlePublishChange}
			/>
		</div>
	);
};

export default BlogManagementPage;
