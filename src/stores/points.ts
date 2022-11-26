import type { MapPointsGroup } from './Types';
import type { IMapPoint } from '../modules/api/restdbio/Types';

import useRestDBIO from '../modules/api/restdbio';
import { writable } from 'svelte/store';

const createPointStore = () => {
	const { subscribe, update, set } = writable<MapPointsGroup>({});

	const addPoint = async (point: IMapPoint) => {
		await useRestDBIO<IMapPoint>({
			endpoint: 'coordspoints',
			method: 'POST',
			body: point
		});

		await updatePoints();
	};

	const updatePoints = async () => {
		const response = await useRestDBIO<IMapPoint, MapPointsGroup>({
			endpoint: 'coordspoints',
			method: 'GET',
			queries: {
				groupby: 'companyId'
			}
		});

		set(response);
	};

	return {
		subscribe,
		update,
		set,
		updatePoints,
		addPoint
	};
};

const pointsStore = createPointStore();

export default pointsStore;
