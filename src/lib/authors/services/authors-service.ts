import q from 'querystring';
import { BooksQuery } from '@/lib/books/definitions/book';
import { ErrorResponse } from '@/lib/shared/definitions';
import { Author } from '@/lib/authors/definitions/definitions';

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/authors`;

export const getAuthors = async (query?: BooksQuery): Promise<Author[]> => {
	const url = query ? `${baseUrl}?${q.stringify(query)}` : baseUrl;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Context-Type': 'application/json',
		},
		cache: 'no-cache',
	});
	const json = await res.json();
	if (res.status != 200) {
		const errRes: ErrorResponse = json;
		throw new Error(errRes.details);
	}
	return json as Author[];
};

export const getAuthorById = async (id: string): Promise<Author> => {
	const url = `${baseUrl}/${id}`;
	const res = await fetch(url, {
		method: 'GET',
		headers: {
			'Context-Type': 'application/json',
		},
		cache: 'no-cache',
	});
	const json = await res.json();
	if (res.status != 200) {
		const errRes: ErrorResponse = json;
		throw new Error(errRes.details);
	}
	return json as Author;
};
