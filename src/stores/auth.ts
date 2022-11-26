import type { IAuthData } from './Types';

import { goto } from '$app/navigation';
import { persist, createCookieStorage } from '@macfja/svelte-persistent-store';
import { writable } from 'svelte/store';

const createAuthStore = () => {
	const { subscribe, update, set } = persist<IAuthData | null | undefined>(
		writable(null),
		createCookieStorage(),
		'auth-store'
	);

	const setUser = (user?: IAuthData['user']) => {
		if (!user) {
			set(null);

			return;
		}

		const { _id } = user;

		const idToken = _id as string;

		set({
			idToken,
			user
		});
	};

	const logout = () => {
		set(null);

		goto('/');
	};

	return {
		subscribe,
		update,
		set,
		setUser,
		logout
	};
};

const authStore = createAuthStore();

export default authStore;
