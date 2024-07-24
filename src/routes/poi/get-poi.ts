import Router from '@koa/router';
import Koa from 'koa';
import Joi from 'joi';
import * as poiManager from '../../managers/poi-manager';
import { E_BAD_REQUEST } from '../../errors';
import { ServiceError } from '../../adapters/service-error';

export function getPoiByIdRoute(router: Router) {
	router.get('/poi/:id', async (context: Koa.Context) => {
		const schema = Joi.object({
			id: Joi.string().required(),
		});

		const { error } = schema.validate(context.params);
		if (error) {
			throw new ServiceError({
				//
				error: E_BAD_REQUEST,
				contextualMessage: error.details[0].message,
			});
		}

		const poi = await poiManager.getById(context.params.id);

		return (context.body = poi);
	});
}
