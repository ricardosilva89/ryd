import Koa from 'koa';
import { ServiceError } from '../adapters/service-error';
import { E_UNKNOWN } from '../errors';

/**
 * Response defines the structure of common Carrier response envelope
 */
type Response = {
	httpCode?: number;
	httpCodeMessage?: string;
	error?: unknown;
	message?: string;
	data?: unknown;
};

export async function wrapResponse(ctx: Koa.Context, next: Function) {
	const response: Response = {};
	try {
		await next();

		response.httpCodeMessage = 'OK';
		response.httpCode = 200;
		response.data = ctx.body;
	} catch (error: any) {
		if (error instanceof ServiceError) {
			ctx.status = error.httpCode;
			response.httpCode = error.httpCode;

			response.httpCodeMessage = error.message;
			response.data = error.contextualData;
			response.message = error.contextualMessage;

			error.log();
		} else {
			const unknownError = new ServiceError({
				error: E_UNKNOWN,
				contextualMessage: error.message,
				innerError: error,
			});

			ctx.status = unknownError.httpCode;
			response.httpCode = unknownError.httpCode;
			response.httpCodeMessage = unknownError.message;

			unknownError.log();
		}
	} finally {
		ctx.body = response;
	}
}
