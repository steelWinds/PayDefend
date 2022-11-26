import type { IUser, IMapPoint } from '../modules/api/restdbio/Types';

interface IAuthData {
	user: IUser;
	idToken: string;
}

type MapPointsGroup = {
	[key: string]: IMapPoint[];
};

export type { IAuthData, MapPointsGroup };
