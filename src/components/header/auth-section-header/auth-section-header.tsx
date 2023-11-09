'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Spinner from '@/components/spinner/spinner';

export default function AuthSectionHeader() {
	const { data: session, status } = useSession();
	console.log(session);
	const isAuthenticated = status === 'authenticated';
	const isLoading = status === 'loading';
	if (isLoading) {
		return <Spinner></Spinner>;
	}
	if (isAuthenticated) {
		return (
			<div className="dropdown dropdown-end">
				<label tabIndex={0} className="avatar btn btn-circle btn-ghost">
					<div className="w-10 rounded-full">
						<img
							src={session?.user.avatar || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
							alt="profile"
						/>
					</div>
				</label>
				<ul
					tabIndex={0}
					className="menu-compact menu dropdown-content rounded-box mt-3 w-52 bg-base-100 p-2 shadow"
				>
					<li>
						<a className="justify-between">
							Perfil
							<span className="badge">New</span>
						</a>
					</li>
					<li>
						<a>Settings</a>
					</li>
					<li>
						<a onClick={() => signOut()}>Cerrar sesión</a>
					</li>
				</ul>
			</div>
		);
	}
	return (
		<>
			<Link href={'/auth/login'}>
				<button className="btn bg-primary">Login</button>
			</Link>
			<Link href={'/auth/signup'}>
				<button className="btn m-1 bg-primary">Signup</button>
			</Link>
		</>
	);
}
