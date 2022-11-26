import type { FetchOptions } from 'ohmyfetch';
import type { FetchDataType } from './Types';

import { $fetch as ohmyfetch } from 'ohmyfetch';

const createUseFetch = (baseURL = '') => {
	const handler = async <T>(
		URI: string,
		options?: FetchOptions
	): Promise<FetchDataType<T>> => {
		const request = ohmyfetch.raw(URI, {
			baseURL,
			...options
		});

		const result = await request;
		const data: T = await result._data;

		return {
			data,
			headers: result.headers
		};
	};

	return handler;
};

export default createUseFetch;
