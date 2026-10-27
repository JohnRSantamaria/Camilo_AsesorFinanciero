export type Product = {
	id: string;
	title: string;
	slug: string;
	short_description: string | null;
	description: string;
	cover_image: string | null;
	payment_url: string;
	payment_label: string | null;
	published: boolean;
	sort_order: number;
	created_at: string;
	updated_at: string;
};

export type ProductInsert = {
	title: string;
	slug: string;
	short_description?: string | null;
	description: string;
	cover_image?: string | null;
	payment_url: string;
	payment_label?: string | null;
	published?: boolean;
	sort_order?: number;
};
