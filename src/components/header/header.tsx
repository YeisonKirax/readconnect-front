import AuthSectionHeader from '@/components/header/auth-section-header/auth-section-header';
import Link from 'next/link';
import SearchSection from '@/components/header/search-section/search-section';

export default function Header() {
	return (
		<div className="navbar rounded-box fixed z-10 mb-5 bg-primary shadow-xl">
			<div className="flex-1">
				<Link className="btn btn-ghost text-xl normal-case" href={'/'}>
					ReadConcect
				</Link>
			</div>
			<div className="flex-none gap-2">
				<SearchSection></SearchSection>
				<AuthSectionHeader></AuthSectionHeader>
			</div>
		</div>
	);
}
