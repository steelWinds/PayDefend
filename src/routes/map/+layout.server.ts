import { redirect } from '@sveltejs/kit';

interface IProps {
	cookies: any;
}

/** @type {import('../../../.svelte-kit/types/src/routes/map/$types').LayoutServerLoad} */
export async function load({ cookies }: IProps) {
	const authJSON = cookies.get('auth-store');

	try {
		const isAuth = Boolean(JSON.parse(authJSON));

		if (!isAuth) {
			throw new Error();
		}
	} catch (err) {
		throw redirect(301, '/');
	}

	return;
}
