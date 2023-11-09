'use client';
import React from 'react';
import BookRow from '@/app/books/components/books-list/book-row/book-row';
import { Book } from '@/lib/books/definitions/book';

type Props = {
	books: Book[];
};
const BooksList: React.FC<Props> = ({ books }) => {
	return books.length > 0 ? (
		<div className="flex w-full flex-col items-center">
			{books.map((book, index) => {
				return <BookRow book={book} key={index}></BookRow>;
			})}
		</div>
	) : (
		<div className="flex flex-col items-center">
			<div className="card border">
				<div className="card-body">
					<h2 className="card-title">No hay resultados</h2>
				</div>
			</div>
		</div>
	);
};
export default BooksList;
