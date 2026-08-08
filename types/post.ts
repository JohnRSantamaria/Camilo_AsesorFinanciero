export type AdminRole = 'owner' | 'admin';

export type Post = {
	id: string;
	title: string;
	slug: string;
	excerpt: string | null;
	content: string;
	cover_image: string | null;
	video_url: string | null;
	published: boolean;
	created_at: string;
	updated_at: string;
	published_at: string | null;
	sort_order: number;
	meta_title: string | null;
	meta_description: string | null;
};

export type PostInsert = {
	title: string;
	slug: string;
	excerpt?: string | null;
	content: string;
	cover_image?: string | null;
	video_url?: string | null;
	published?: boolean;
	published_at?: string | null;
	sort_order?: number;
	meta_title?: string | null;
	meta_description?: string | null;
};

export type PostUpdate = Partial<PostInsert>;
