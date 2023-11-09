import 'next-auth';

declare module 'next-auth' {
	interface Session {
		user: {
			user_id: string;
			fullName: string;
			avatar: string;
			token: string;
		};
	}
}
