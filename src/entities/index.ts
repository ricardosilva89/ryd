/**
 * An Entity is purely the contractual definition of the characteristics of
 * an important data structure in the domain of a service.
 *
 * Each Entity is best thought as a discrete type of Lego piece,
 * which in composition and arranged in any given way reflect a certain application state.
 *
 * Business logic happens because of the state of Entities, not within Entities themselves.
 * That means that entities do not contain any code other than the necessary to describe its schema
 */

//TODO: separate the entities in different files
export enum PoiStatus {
	OPEN = '1',
	CLOSED = '0',
}

export type Address = {
	country: string;
	zipCode: string;
	city: string;
	street: string;
	houseNumber: string;
};

export type OpeningHours = {
	publicHolydays: boolean;
	monday: { isOpen: boolean; openTime: string; closeTime: string };
	tuesday: { isOpen: boolean; openTime: string; closeTime: string };
	wednesday: { isOpen: boolean; openTime: string; closeTime: string };
	thursday: { isOpen: boolean; openTime: string; closeTime: string };
	friday: { isOpen: boolean; openTime: string; closeTime: string };
	saturday: { isOpen: boolean; openTime: string; closeTime: string };
	sunday: { isOpen: boolean; openTime: string; closeTime: string };
};

export type Pump = {
	pumpId: string;
	name: string;
	fuelProducts: FuelProduct[];
};

export type FuelProduct = {
	fuelProductId: string;
	name: string;
	type: string;
	prices: {
		currency: string;
		price: number;
	}[];
};

export type Poi = {
	poiId: string;
	status: PoiStatus;
	address: Address;
	openingHours: OpeningHours;
	pumps: Pump[];
};
