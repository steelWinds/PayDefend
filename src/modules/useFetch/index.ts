import type { FetchOptions } from 'ohmyfetch';
import type { FetchDataType } from './Types';

import { $fetch as ohmyfetch } from 'ohmyfetch';

const useFetch = async <T>(
	URI: string,
	options?: FetchOptions
): Promise<FetchDataType<T>> => {
	const request = ohmyfetch.raw(URI, {
		...options
	});

	const result = await request;
	const data: T = await result._data;

	return {
		data,
		headers: result.headers
	};
};

export default useFetch;
