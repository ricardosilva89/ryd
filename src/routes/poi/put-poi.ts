import Router from '@koa/router';
import Koa from 'koa';
import Joi from 'joi';
import * as poiManager from '../../managers/poi-manager';
import { E_BAD_REQUEST } from '../../errors';
import { ServiceError } from '../../adapters/service-error';

export function putPoiByIdRoute(router: Router) {
	router.put('/poi/:id', async (context: Koa.Context) => {
		const schema = Joi.object({
			//TODO: validate poi body request
		});

		const { error } = schema.validate(context.params);
		if (error) {
			throw new ServiceError({
				//
				error: E_BAD_REQUEST,
				contextualMessage: error.details[0].message,
			});
		}

		//TODO: Parsing data to retrieve a domain object type Poi
		const poi: any = {};

		//TODO: Start transaction

		const updatedPoi = await poiManager.create(poi);

		return (context.body = updatedPoi);
	});
}
