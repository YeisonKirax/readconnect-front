'use client';
import BooksList from '@/app/books/components/books-list/books-list';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Page } from '@/lib/shared/definitions';
import { Book } from '@/lib/books/definitions/book';
import { getBooks } from '@/lib/books/services/books-service';
import Spinner from '@/components/spinner/spinner';
import Pagination from '@/components/pagination/pagination';

export default function Books() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [bookRes, setBookRes] = useState<Page<Book>>({ items: [], page: 0, pages: 0, size: 0, total: 0 });
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const searchParams = useSearchParams();
	const searchQuery = searchParams.get('search');
	const extraData = searchParams.get('include_extra_data');

	useEffect(() => {
		getBooks({
			search: searchQuery,
			page: currentPage ?? 1,
			size: pageSize ?? 10,
			include_extra_data: extraData == 'true',
		})
			.then((res) => {
				setLoading(false);
				setBookRes(res);
			})
			.catch((e) => {
				setLoading(false);
				setError(true);
			});
	}, [currentPage, pageSize, searchQuery]);
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
		<div className="flex min-h-screen flex-col items-center bg-base-200">
			<Pagination
				size={pageSize}
				page={currentPage}
				search={searchQuery ?? ''}
				onPageChange={setCurrentPage}
				pages={bookRes.pages}
				setLoading={setLoading}
			>
				{loading ? <Spinner></Spinner> : <BooksList books={bookRes.items}></BooksList>}
			</Pagination>
		</div>
	);
}
