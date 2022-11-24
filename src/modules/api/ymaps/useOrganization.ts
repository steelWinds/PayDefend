import type { ILimitedReq, IOrganizationResponse } from './Types';

import useGeocode from './useGeocode';
import useFetch from '../../useFetch';

interface Props extends ILimitedReq {
	coords: [number, number];
	lang: string;
}

const API_KEY = import.meta.env.VITE_YANDEX_BIZ_API_KEY;

const useOrganizations = async (props: Props) => {
	const { coords, results, lang } = props;

	const addresses = await useGeocode({ coords, results: 1, kind: 'house' });

	if (!addresses.length) return [];

	console.log(addresses);

	const formatAddresses = addresses
		.map(
			(addr) => `
      ${addr.metaDataProperty.GeocoderMetaData.Address.formatted}, 
      ${addr.name}
    `
		)
		.join();

	const { data } = await useFetch<IOrganizationResponse>(
		'https://search-maps.yandex.ru/v1/',
		{
			query: {
				apikey: API_KEY,
				text: formatAddresses,
				results,
				lang,
				type: 'biz'
			}
		}
	);

	return data.features;
};

export default useOrganizations;