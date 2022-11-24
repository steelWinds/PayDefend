interface ILimitedReq {
	results: number;
}

interface Geometry {
	type: string;
	coordinates: [number, number];
}

interface IGeoObject {
	name: string;
	description: string;
	metaDataProperty: {
		GeocoderMetaData: {
			Address: {
				formatted: string;
				postal_code: string;
			};
		};
	};
}

interface ICompanyMetaData {
	id: string;
	name: string;
	address: string;
	url: string;
}

interface IOrganizationFeature {
	properties: {
		CompanyMetaData: ICompanyMetaData;
	};
	geometry: Geometry;
}

interface IGeocodeResponse {
	GeoObjectCollection: {
		featureMember: Array<{ GeoObject: IGeoObject }>;
	};
}

interface IOrganizationResponse {
	features: IOrganizationFeature[];
}

export type {
	ILimitedReq,
	IGeocodeResponse,
	IOrganizationResponse,
	ICompanyMetaData,
	IGeoObject,
	IOrganizationFeature
};
