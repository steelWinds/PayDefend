import type { IAuthData } from '../stores/Types';
import type { IUser } from '../modules/api/restdbio/Types';

import { get } from 'svelte/store';
import { redirect } from '@sveltejs/kit';
import { parseURL } from 'ufo';
import useRestDBIO from '../modules/api/restdbio';
import authStore from '../stores/auth';

interface IProps {
	cookies: any;
	request: any;
}

const redirectToProtected = (currentPath: string, path: string) => {
	if (currentPath === path) {
		return;
	}

	throw redirect(301, path);
};

/** @type {import('../../../.svelte-kit/types/src/routes/map/$types').LayoutServerLoad} */
export async function load({ cookies, request }: IProps) {
	const authJSON = cookies.get('auth-store');
	const routeId = parseURL(request.url).pathname;

	let auth: IAuthData;

	try {
		const { idToken } = JSON.parse(authJSON) as IAuthData;

		const response = await useRestDBIO<IUser, IUser[]>({
			endpoint: 'usersdata',
			method: 'GET',
      queries: {
        q: { _id: idToken }
      }
		});

		const user = response?.[0];

		authStore.setUser(user);

		auth = get(authStore) as IAuthData;
	} catch (e) {
		return redirectToProtected(routeId, '/');
	}

	if (!auth) {
		return redirectToProtected(routeId, '/');
	} else if (routeId === '/' && auth) {
		return redirectToProtected(routeId, '/map');
	}

	return;
}
