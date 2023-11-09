'use client';
import React, { useRef, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/spinner/spinner';

export default function Signup() {
	const router = useRouter();
	const [signupLoading, setSignupLoading] = useState(false);
	const nameRef = useRef<HTMLInputElement>(null);
	const surnameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const handlerSignupSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSignupLoading(true);
		const name = nameRef.current?.value;
		const surname = surnameRef.current?.value;
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		try {
			const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`;
			const res = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					surname,
					email,
					password,
				}),
			});
			await signIn('login', { email, password, redirect: false });
			setSignupLoading(false);
			router.push('/');
		} catch (e) {
			console.error(e);
		}
	};
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col">
				<div className="text-center lg:text-left">
					<h1 className="text-5xl font-bold">Signup now!</h1>
				</div>
				<div className="divider"></div>
				<div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
					<form className="card-body" onSubmit={handlerSignupSubmit}>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Nombre</span>
							</label>
							<input
								type="text"
								ref={nameRef}
								placeholder="Nombre"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Apellido</span>
							</label>
							<input
								type="text"
								ref={surnameRef}
								placeholder="Apellido"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								ref={emailRef}
								placeholder="email"
								className="input input-bordered"
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								ref={passwordRef}
								placeholder="password"
								className="input input-bordered"
								required
							/>
							<label className="label">
								<a href="#" className="link-hover link label-text-alt">
									Forgot password?
								</a>
							</label>
						</div>
						<div className="form-control mt-6">
							{signupLoading ? (
								<button>
									<Spinner></Spinner>
								</button>
							) : (
								<button className="btn btn-primary">Signup</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
