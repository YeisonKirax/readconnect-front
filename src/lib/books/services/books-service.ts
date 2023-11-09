import q from 'querystring';
import { Book, BooksQuery } from '@/lib/books/definitions/book';
import { ErrorResponse, Page } from '@/lib/shared/definitions';

const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/books`;

export const getBooks = async (query?: BooksQuery): Promise<Page<Book>> => {
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
	return json as Page<Book>;
};

export const getBookById = async (id: string): Promise<Book> => {
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
	return json as Book;
};
