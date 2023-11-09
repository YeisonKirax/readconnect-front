import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface UserState {
	user: {
		name: string;
		surname: string;
		email: string;
	} | null;
	token: string | null;
	isAuthenticated: boolean;
	login: (email: string, password: string) => Promise<{ token: string }>;
}

export const useUserStore = create<UserState>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				isAuthenticated: false,
				token: null,
				login: (email: string, password: string) => {
					set(
						{
							user: {
								name: 'Yeison',
								surname: 'Fernandez',
								email: 'y@email.com',
							},
							token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR5RjNBSlFOYlMxVjBSOTdzS29kUSIsImF2YXRhciI6bnVsbCwiZW1haWwiOiJ5ZWlzb25AZ21haWwuY29tIiwiZnVsbE5hbWUiOiJZZWlzb24gRmVybmFuZGV6In0.suOjs8GTt76OuM72xQPMU8ksa-MZP_b6jkT4UlO31S5Zh34ysALxSBFLW5yZtXWnldM004AVSAPUnTlZjzT5Jg',
							isAuthenticated: true,
						},
						false,
						{ type: 'UpdateUser' },
					);
					return new Promise((resolve) => {
						setTimeout(() => {
							resolve({ token: 'Exito' });
						}, 2000);
					});
				},
			}),
			{ name: 'user-storage', storage: createJSONStorage(() => sessionStorage) },
		),
		{ name: 'UserState', enabled: true, store: 'UserStore' },
	),
);
