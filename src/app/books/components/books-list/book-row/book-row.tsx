'use client';
import React, { ReactNode } from 'react';
import { Book } from '@/lib/books/definitions/book';
import './book-row.css';
import { useRouter } from 'next/navigation';

type Props = {
	book: Book;
	children?: ReactNode;
};

const BookRow: React.FC<Props> = ({ book }) => {
	const { push } = useRouter();

	const goToBook = (id: string) => {
		push(`books/${id}`);
	};
	return (
		<div className="card mt-4 w-3/4 justify-center bg-base-100 shadow-xl lg:card-side " key={book.id}>
			<figure className="book-img w-2/4 sm:w-full">
				<img
					src={
						book.thumbnail_url ||
						'https://thumbs.dreamstime.com/b/open-black-book-question-marks-flying-out-isolated-white-background-flat-vector-reading-icon-unknown-pictogram-ask-symbol-99042363.jpg'
					}
					alt={book.title}
				/>
			</figure>
			<div className="card-height card-body indicator w-2/4 sm:w-full">
				<span className="badge indicator-item badge-primary">
					{new Date(book.published_date).toLocaleDateString()}
				</span>
				<h2 className="card-title">{book.title}</h2>
				<p>{book.short_description}</p>
				<div className="card-actions justify-end">
					{book.authors?.map((author) => (
						<button key={author.id} className="btn">
							{author.name}
						</button>
					))}
				</div>
				<div className="card-actions justify-end">
					{book.categories?.map((category) => (
						<button key={category.id} className="btn">
							{category.name}
						</button>
					))}
					<button className="btn btn-primary" onClick={() => goToBook(book.id)}>
						Ver
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookRow;
