'use client';
import './books-carrousel.css';
import { Book } from '@/lib/books/definitions/book';
import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
	books: Book[];
};
export default function BooksCarrousel({ books }: Props) {
	const { push } = useRouter();
	const goToBook = (bookId: string) => {
		push(`/books/${bookId}`);
	};
	return (
		<div className="carousel carousel-center indicator rounded-box max-w-xl space-x-4 bg-neutral p-4">
			{books.map((book) => (
				<div key={book.id} className="carousel-item indicator">
					<span className="badge indicator-item badge-primary">
						<button onClick={() => goToBook(book.id)}>Ver</button>
					</span>
					<img src={book.thumbnail_url} className="book rounded-box" />
				</div>
			))}
		</div>
	);
}
