export interface Page<T> {
	page: number;
	size: number;
	total: number;
	pages: number;
	items: T[];
}

export interface ErrorResponse {
	status: 'error';
	details: string;
}
