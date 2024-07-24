/**
 * Managers are the brokers/controllers of Entities.
 * They define the business logic that controls, mutates and validates
 * the state of the instances of the Entity type under their management.
 */
import { Poi } from '../entities';
import * as poiRepository from '../repositories/poi-repository';

export function getMany() {
	//TODO: check permssions
	return poiRepository.getMany();
}

export function getById(id: string) {
	//TODO: check permssions
	return poiRepository.getById(id);
}

export function remove(id: string) {
	//TODO: check permssions

	return poiRepository.deleteById(id);
}

export function create(poi: Poi) {
	//TODO: check permssions

	return poiRepository.create(poi);
}

export function update(poi: Poi) {
	//TODO: check permssions

	return poiRepository.udpateById(poi);
}
