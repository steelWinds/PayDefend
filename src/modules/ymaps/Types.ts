type Coords = [number, number];
type RestrictCoords = [Coords, Coords];

type MapOptions = {
	center: Coords;
	zoom: number;
	restrictMapArea?: RestrictCoords;
	controls?: string[];
	searchOptions?: any;
	id: string;
};

export type { Coords, RestrictCoords, MapOptions };
