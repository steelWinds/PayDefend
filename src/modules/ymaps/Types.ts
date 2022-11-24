import type { IEvent, IMapState, IMapOptions } from 'yandex-maps'

type Coords = [number, number];
type RestrictCoords = [Coords, Coords];

type MapOptions = {
  id: string
  state?: IMapState
	options?: IMapOptions
  event?: {
    name: string,
    handler: (e: IEvent) => void
  }
};

export type { Coords, RestrictCoords, MapOptions };
