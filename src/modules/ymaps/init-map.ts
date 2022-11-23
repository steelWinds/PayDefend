import type { MapOptions } from './Types'

import ymaps from 'ymaps';

const initMap = async (key: string, options: MapOptions) => {
  const { searchOptions, restrictMapArea, controls, id, ...mapOptions } = options;
  
  const maps = await ymaps.load(
    `https://api-maps.yandex.ru/2.1/?apikey=${key}&lang=ru_RU`
  )
  
  const searchControl = new maps.control.SearchControl({
    options: Object.assign({
      size: 'large',
      provider: 'yandex#search',
      noSuggestPanel: true,  
    }, searchOptions ?? {}),
  })

  return new maps.Map(id, {
    controls: [...(controls ?? []), searchControl],
    ...mapOptions
  }, 
  {
    restrictMapArea
  })
}

export default initMap