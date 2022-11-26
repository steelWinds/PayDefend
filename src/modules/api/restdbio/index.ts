import type { Provides, Endpoints } from './Types';

import createUseFetch from '../../createUseFetch';

interface IProps<T> {
	endpoint: Endpoints;
	method: string;
	body?: T;
	queries?: {
		[key: string]: any;
	};
}

const API_KEY: string = import.meta.env.VITE_RESTDBIO_API_KEY;

const useFetch = createUseFetch('https://users-2029.restdb.io/rest');

const useRestDBIO = async <T extends Provides, A = T>(
	props: IProps<T>
): Promise<A> => {
	const { endpoint, method, body, queries } = props;

	const { q, ...otherQueries } = queries ?? {};

	const { data } = await useFetch<readonly T[]>(endpoint, {
		method,
		headers: {
			'x-apikey': API_KEY
		},
		body: method !== 'GET' && method !== 'HEAD' ? body : undefined,
		query:
			method === 'GET'
				? {
						q: JSON.stringify(q ?? {}),
						...otherQueries
				  }
				: undefined
	});

	return data as A;
};

export default useRestDBIO;
