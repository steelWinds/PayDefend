import type { IUser } from '../modules/api/restdbio/Types';

interface IAuthData {
	user: IUser;
	idToken: string;
}

export type { IAuthData };
