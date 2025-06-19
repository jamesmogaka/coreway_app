export interface Category {
	id: string;
	name: string;
	description?: string;
}

export interface Value {
	id: string;
	name: string;
}

export interface ProductContent {
	id?: string;
	name: string;
	details: string;
}

export interface ProductFeature {
	id?: string;
	feature: string;
}

export interface Product {
	product: string;
	name: string;
	description: string;
	price: number;
	image_url: string;
	stock: number;
	age_range?: string;
	category_id?: string;
	category?: Category;
	values?: Value[];
	contents?: ProductContent[];
	features?: ProductFeature[];
}
