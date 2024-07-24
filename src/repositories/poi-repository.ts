/**
 * Repositories have one, and only one objective: storage and retrieval of Entities.
 * The storage and retrieval can be from a datasource, etc or even from another service
 * Any business logic that's not strictly related with pure entity state management
 * in a data store is outside the scope of a Repository and should be handled
 * instead in the Manager of the Entity.
 */
import { request } from '../adapters/fetch';
import { ServiceError } from '../adapters/service-error';
import { Poi, PoiStatus } from '../entities';
import { E_CALL_POI_DATABASE } from '../errors';

let dummyData: Poi[];

export function getMany() {
	try {
		return dummyData;
	} catch (error) {
		throw new ServiceError({
			error: E_CALL_POI_DATABASE,
			innerError: error,
			contextualMessage: `Error while fetching poi`,
		});
	}
}

export function getById(id: string): Poi | undefined {
	try {
		const res = dummyData.find((poi) => poi.poiId === id);

		return res;
	} catch (error) {
		throw new ServiceError({
			error: E_CALL_POI_DATABASE,
			innerError: error,
			contextualMessage: `Error while fetching poi with id ${id}`,
		});
	}
}

export function deleteById(id: string) {
	id;
}

export function create(poi: Poi) {
	poi;
}

export function udpateById(poi: Poi) {
	poi;
}
