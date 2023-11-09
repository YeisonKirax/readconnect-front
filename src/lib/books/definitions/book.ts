import { Author } from '@/lib/authors/definitions/definitions';
import { Category } from '@/lib/categories/definitions/definitions';

export interface Book {
	id: string;
	title: string;
	isbn?: string;
	page_count: number;
	published_date: string;
	thumbnail_url?: string;
	short_description: string;
	long_description: string;
	status: string;
	categories?: Category[];
	authors?: Author[];
}

export type BooksQuery = {
	search?: string | null;
	page?: number;
	size?: number;
	include_extra_data?: boolean;
};
