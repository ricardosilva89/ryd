import Router from '@koa/router';
import Koa from 'koa';
import * as poiManager from '../../managers/poi-manager';

export function getPoisRoute(router: Router) {
	router.get('/pois', async (context: Koa.Context) => {
		const pois = await poiManager.getMany();

		context.body = pois;
	});
}
