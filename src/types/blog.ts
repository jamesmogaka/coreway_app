export interface BlogPost {
	id: string;
	title: string;
	content: string;
	summary: string | null;
	is_published: boolean;
	author_id: string;
	created_at: string;
	updated_at: string;
}
