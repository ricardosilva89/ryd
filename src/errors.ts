import { ErrorSeverity, IError } from './adapters/service-error';

export const E_BAD_REQUEST: IError = {
	httpCode: 400,
	message: 'Bad request',
	severity: ErrorSeverity.Low,
};

export const E_UNKNOWN: IError = {
	httpCode: 500,
	message: 'Some internal error occurred',
	severity: ErrorSeverity.High,
};

export const E_CALL_POI_DATABASE: IError = {
	httpCode: 500,
	message: 'Some error occurred while calling poi database',
	severity: ErrorSeverity.High,
};
