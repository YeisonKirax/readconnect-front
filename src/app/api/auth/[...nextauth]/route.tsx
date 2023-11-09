import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			id: 'login',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
					placeholder: 'Email',
				},
				password: {
					label: 'Contraseña',
					type: 'text',
					placeholder: 'Contraseña',
				},
			},
			async authorize(credentials, req) {
				const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`;
				try {
					const res = await fetch(url, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							email: credentials?.email,
							password: credentials?.password,
						}),
					});
					const response = await res.json();
					console.log('=>(route.tsx:31) response', response);
					if (response.status === 'ERROR') {
						throw response;
					}
					return response;
				} catch (e) {
					console.log(e);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
	session: {
		strategy: 'jwt',
	},
});
export { handler as GET, handler as POST };
