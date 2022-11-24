type PosStackAddress = {
	administrative_area: string;
	confidence: number;
	continent: string;
	country: string;
	country_code: string;
	county: string;
	distance: number;
	label: string;
	latitude: number;
	locality: string;
	longitude: number;
	name: string;
	neighbourhood: string;
	number: string;
	postal_code: string;
	region: string;
	region_code: string;
	street: string;
	type: 'venue' | 'address';
};

export type { PosStackAddress };
