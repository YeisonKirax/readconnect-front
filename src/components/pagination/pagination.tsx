'use client';
import React, { ReactNode } from 'react';

type Props = {
	children?: ReactNode;
	size: number;
	page: number;
	pages: number;
	search: string;

	onPageChange: (page: number) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
const Pagination: React.FC<Props> = ({ children, page, onPageChange, pages, setLoading }) => {
	const handleNextPage = () => {
		onPageChange(page + 1);
		setLoading(true);
	};
	const handleBackPage = () => {
		onPageChange(page - 1);
		setLoading(true);
	};

	return (
		<div className="container flex flex-col items-center">
			<div className="join">
				<button className="btn join-item" onClick={handleBackPage} disabled={page <= 1}>
					«
				</button>
				<button className="btn join-item">
					{page} de {pages}
				</button>
				<button className="btn join-item" onClick={handleNextPage} disabled={page >= pages}>
					»
				</button>
			</div>
			<div className="divider"></div>
			{children}
			<div className="divider"></div>
			<div className="join">
				<button className="btn join-item" onClick={handleBackPage} disabled={page <= 1}>
					«
				</button>
				<button className="btn join-item">
					{page} de {pages}
				</button>
				<button className="btn join-item" onClick={handleNextPage} disabled={page >= pages}>
					»
				</button>
			</div>
		</div>
	);
};
export default Pagination;
