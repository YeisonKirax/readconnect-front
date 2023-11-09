import { Book } from '@/lib/books/definitions/book';

export interface Author {
	id: string;
	name: string;
	books?: Book[];
}
