type Coords = [number, number];
type RestrictCoords = [Coords, Coords];

type MapOptions = {
	center: Coords;
	zoom: number;
	restrictMapArea?: RestrictCoords;
	controls?: string[];
  searchOptions?: {
    [key: string]: boolean | string | number;
  };
	id: string;
};

export type { Coords, RestrictCoords, MapOptions };
