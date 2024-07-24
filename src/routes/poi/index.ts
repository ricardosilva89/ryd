import Router from '@koa/router';
import Koa from 'koa';
import { getPoiByIdRoute } from './get-poi';
import { getPoisRoute } from './get-pois';
import { deletePoiByIdRoute } from './delete-poi';
import { postPoiRoute } from './post-poi';
import { putPoiByIdRoute } from './put-poi';
import * as middleware from '../../middleware';

export function initPoiRoutes(app: Koa) {
	const router = new Router({ prefix: '/api/v1' });

	app.use(middleware.wrapResponse);

	getPoisRoute(router);
	getPoiByIdRoute(router);
	deletePoiByIdRoute(router);
	postPoiRoute(router);
	putPoiByIdRoute(router);

	app.use(router.routes());
}
