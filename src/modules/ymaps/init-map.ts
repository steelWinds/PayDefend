import type { MapOptions } from './Types';

import createYmaps from 'ymaps';

const initMap = async (key: string, options: MapOptions) => {
	const { id, event, state: mapState, options: mapOptions } = options;
	const { controls, ...otherMapState } = mapState ?? {};

	const ymaps = await createYmaps.load(
		`https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`
	);

	const searchControl = new ymaps.control.SearchControl({
		options: Object.assign({
			size: 'large',
			provider: 'yandex#search',
			noSuggestPanel: true
		})
	});

	const map = new ymaps.Map(
		id,
		{
			controls: [...(controls ?? []), searchControl],
			...(otherMapState ?? {})
		},
		{
			...(mapOptions ?? {})
		}
	);

	if (event) {
		map.events.add(event.name, event.handler);
	}

	return { ymaps, map };
};

export default initMap;
