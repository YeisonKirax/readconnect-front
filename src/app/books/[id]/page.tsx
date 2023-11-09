'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getBookById } from '@/lib/books/services/books-service';
import { Book } from '@/lib/books/definitions/book';

const ViewBook: React.FC = () => {
	const { push } = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [book, setBook] = useState<Book>({
		authors: [],
		categories: [],
		id: '',
		isbn: '',
		long_description: '',
		page_count: 0,
		published_date: '',
		short_description: '',
		status: '',
		thumbnail_url: '',
		title: '',
	});

	const { id } = useParams() as { id: string };
	useEffect(() => {
		getBookById(id)
			.then((res) => {
				setLoading(false);
				setBook(res);
			})
			.catch((e) => {
				console.error(e);
				setLoading(false);
				setError(true);
			});
	}, [id]);
	const goToAuthor = (authorId: string) => {
		push(`/authors/${authorId}`);
	};
	return (
		<div className="flex w-full flex-col border-opacity-50">
			<div className="card rounded-box grid min-h-screen place-items-center bg-base-300">
				<div className="card mt-4 w-3/4 justify-center bg-base-100 shadow-xl lg:card-side ">
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
						<p>{book.long_description}</p>
						<div className="card-actions justify-end">
							{book.authors?.map((author) => (
								<button key={author.id} className="btn" onClick={() => goToAuthor(author.id)}>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ViewBook;
