'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useRef } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchSection() {
	const searchParams = useSearchParams();
	const { push } = useRouter();
	const searchRef = useRef<HTMLInputElement>(null);
	const handleSearch = useDebouncedCallback((e: React.FormEvent) => {
		e.preventDefault();
		const search = searchRef.current?.value;
		const params = new URLSearchParams(searchParams);
		if (search) {
			params.set('search', search);
			params.set('include_extra_data', 'true');
		} else {
			params.delete('search');
		}
		push(`/books?${params.toString()}`);
	}, 1000);
	return (
		<div className="form-control">
			<input
				type="text"
				ref={searchRef}
				onChange={handleSearch}
				placeholder="Buscar libro/isbn"
				defaultValue={searchParams.get('search')?.toString()}
				className="input input-bordered w-24 md:w-auto"
			/>
		</div>
	);
}
