import type { IEvent, IMapState, IMapOptions } from 'yandex-maps';

interface MapOptions {
	id: string;
	state?: IMapState;
	options?: IMapOptions;
	event?: {
		name: string;
		handler: (e: IEvent) => void;
	};
}

export type { MapOptions };
