'use client';
import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/spinner/spinner';

export default function Login() {
	const router = useRouter();
	const [loginLoading, setLoginLoading] = useState(false);

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const handleLoginForm = async (e: any) => {
		e.preventDefault();
		setLoginLoading(true);
		const email = emailRef.current?.value || '';
		const password = passwordRef.current?.value || '';
		try {
			await signIn('login', {
				email,
				password,
				redirect: false,
			});
			setLoginLoading(false);
			router.push('/');
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Login now!</h1>
				</div>
				<div className="divider"></div>
				<div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
					<form className="card-body" onSubmit={handleLoginForm}>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="email"
								className="input input-bordered"
								ref={emailRef}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder="password"
								className="input input-bordered"
								required
								ref={passwordRef}
							/>
							<label className="label">
								<a href="#" className="link-hover link label-text-alt">
									Forgot password?
								</a>
							</label>
						</div>
						<div className="form-control mt-6">
							{loginLoading ? (
								<button>
									<Spinner></Spinner>
								</button>
							) : (
								<button className="btn btn-primary">Login</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
