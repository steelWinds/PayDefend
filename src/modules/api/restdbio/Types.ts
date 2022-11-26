type CheckingOrganization = 'fas' | 'ifns' | 'sber' | 'rsp' | 'ses';

interface IIDItem {
	_id?: string;
	id?: string;
}

interface IMapPoint {
	coords?: [number, number];
	companyName?: string;
	checked?: boolean;
	companyId?: string;
}

interface IUser extends IIDItem {
	phone?: string;
	name?: string;
	color?: string;
	points?: Array<[number, number]>;
}

interface ICompany extends IIDItem {
	companyName?: string;
	comment?: string;
	type?: CheckingOrganization;
	images?: {
		data: string[];
	};
	userId?: string;
	companyURL?: string;
}

type Provides = IUser | ICompany;
type Endpoints = string;

export type {
	IUser,
	ICompany,
	Provides,
	Endpoints,
	CheckingOrganization,
	IMapPoint
};
