'use client';
import React, { useEffect, useState } from 'react';
import { Author } from '@/lib/authors/definitions/definitions';
import { getAuthorById } from '@/lib/authors/services/authors-service';
import BooksCarrousel from '@/app/books/[id]/components/books-carrousel/books-carrousel';
import { useParams } from 'next/navigation';
import Spinner from '@/components/spinner/spinner';

const ViewAuthor: React.FC = () => {
	const { id } = useParams() as { id: string };
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [author, setAuthor] = useState<Author>({ books: [], id: '', name: '' });

	useEffect(() => {
		getAuthorById(id)
			.then((res) => {
				setLoading(false);
				setAuthor(res);
			})
			.catch((e) => {
				setLoading(false);
				setError(true);
			});
	}, [id]);
	if (error) {
		return (
			<div className="flex flex-col items-center">
				<div className="card border">
					<div className="card-body">
						<h2 className="card-title">Ocurrió un error en su petición.</h2>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex flex-col items-center">
			<h3 className="text-lg font-bold">Libros del author: {author.name}</h3>
			{loading ? <Spinner></Spinner> : <BooksCarrousel books={author.books ?? []}></BooksCarrousel>}
		</div>
	);
};
export default ViewAuthor;
