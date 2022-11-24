import type { MapOptions } from './Types';

import ymaps from 'ymaps';

const initMap = async (key: string, options: MapOptions) => {
  const { id, event, state: mapState, options: mapOptions } = options;
  const { controls, ...otherMapState } = mapState ?? {};

	const maps = await ymaps.load(
		`https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`
	);

	const searchControl = new maps.control.SearchControl({
		options: Object.assign(
			{
				size: 'large',
				provider: 'yandex#search',
				noSuggestPanel: true
			}
		)
  });
  
	const map = new maps.Map(
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
    
  return map;
};

export default initMap;
