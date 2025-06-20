import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/types/blog";

const BLOG_TABLE = "blog_posts";

export const getBlogPosts = async (): Promise<BlogPost[]> => {
	const { data, error } = await supabase
		.from(BLOG_TABLE)
		.select("*")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching blog posts:", error);
		throw error;
	}

	return data || [];
};

export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
	const { data, error } = await supabase
		.from(BLOG_TABLE)
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error(`Error fetching blog post with id ${id}:`, error);
		// It's better to return null than throw an error if the post is not found
		if (error.code === "PGRST116") {
			return null;
		}
		throw error;
	}

	return data;
};

export const createBlogPost = async (
	post: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost> => {
	const { data, error } = await supabase
		.from(BLOG_TABLE)
		.insert([post])
		.select()
		.single();

	if (error) {
		console.error("Error creating blog post:", error);
		throw error;
	}

	return data;
};

export const updateBlogPost = async (
	id: string,
	updates: Partial<BlogPost>
): Promise<BlogPost> => {
	const { data, error } = await supabase
		.from(BLOG_TABLE)
		.update(updates)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(`Error updating blog post with id ${id}:`, error);
		throw error;
	}

	return data;
};

export const deleteBlogPost = async (id: string): Promise<void> => {
	const { error } = await supabase.from(BLOG_TABLE).delete().eq("id", id);

	if (error) {
		console.error(`Error deleting blog post with id ${id}:`, error);
		throw error;
	}
};
