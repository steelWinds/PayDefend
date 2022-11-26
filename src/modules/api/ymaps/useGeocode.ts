import type { IGeocodeOptions } from 'yandex-maps';
import type { ILimitedReq, IGeocodeResponse } from './Types';

import createUseFetch from '../../createUseFetch';

interface Props extends ILimitedReq {
	coords: [number, number];
	kind: IGeocodeOptions['kind'];
}

const API_KEY = import.meta.env.VITE_YANDEX_API_KEY;

const useFetch = createUseFetch();

const useGeocode = async (props: Props) => {
	const { coords, kind, results } = props;

	const formatCoords = coords
		.map((c) => c.toFixed(6))
		.reverse()
		.join();

	const { data } = await useFetch<{ response: IGeocodeResponse }>(
		'https://geocode-maps.yandex.ru/1.x',
		{
			query: {
				apikey: API_KEY,
				geocode: formatCoords,
				kind,
				format: 'json',
				results
			}
		}
	);

	const { response } = data;

	return (
		response.GeoObjectCollection.featureMember?.map(
			(geoObj) => geoObj.GeoObject
		) ?? []
	);
};

export default useGeocode;
