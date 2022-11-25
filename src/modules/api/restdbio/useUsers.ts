import type { IUser } from './Types';

import useFetch from '../../useFetch';

const API_KEY = import.meta.env.VITE_RESTDBIO_API_KEY;

const useUsers = async (method: string, user?: IUser) => {
	const { data } = await useFetch<IUser | IUser[]>(
		'https://users-2029.restdb.io/rest/usersdata',
		{
			method,
			headers: {
				'x-apikey': API_KEY
			},
			body: method !== 'GET' && method !== 'HEAD' ? user : undefined,
			query: method === 'GET' ? { q: JSON.stringify(user) } : undefined
		}
	);

	return data;
};

export default useUsers;
