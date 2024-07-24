/** ErrorSeverity defines the severity level of an error */
export enum ErrorSeverity {
	/**
	 * Low severity is used for cases that this error DOES NOT cause any real
	 * impact on the service operation.
	 *
	 * This level corresponds to 'info' level in logs.
	 */
	Low,

	/**
	 * Medium severity is used for the cases where the error can have partial
	 * or limited impact on the application but for which the team has no
	 * real control of. E.g an external dependency being down.
	 *
	 * This level corresponds to 'warning' level in logs.
	 */
	Medium,

	/**
	 * High severity is used whenever the error compromises the application.
	 * For example, unhandled exceptions, service own database is down,
	 * wrongly formatted messages, etc.
	 *
	 * This level corresponds to 'error' level in logs.
	 */
	High,
}

export interface IError {
	/**
	 * The HTTP status code of response in case this error has been executed within the context of an HTTP request.
	 */
	httpCode: number;

	/** The message explaining why this error occurred */
	message: string;

	/** The severity level of the error that just occurred */
	severity: ErrorSeverity;
}

/**
 * ServiceError defines the base structure of errors thrown within Carrier
 */
export class ServiceError extends Error {
	/** The type of error thrown */
	error: IError;

	/** Optional contextual message that explains the error */
	contextualMessage?: string;

	/**
	 * Optional contextual generic object that contains more details about
	 * the error and possible on how to deal with it.
	 *
	 * This contextual data can be passed from within an innerError (as long
	 * as the innerError was a serviceError and the current service error does
	 * not explicitly receive a contextual data)
	 */
	contextualData?: { [key: string]: any };

	/**
	 * Optional original error being wrapped by the service error
	 *
	 * This value must be set if the full stack trace of all the errors that
	 * bubbled is to be pushed into the logs.
	 */
	innerError?: Error;

	/**
	 * The HTTP status code of response in case this error has been executed within the context of an HTTP request.
	 */
	httpCode: number;

	/**
	 * Constructor
	 *
	 * @param error
	 *  The type of error being thrown
	 * @param contextualMessage
	 *  Optional contextual message explaining why the error was thrown
	 * @param contextualData
	 *  Optional contextual data explaining why the error was thrown or how to deal with it
	 * @param innerError
	 *  Optional inner error being wrapped by this service error
	 */
	constructor(args: {
		error: IError;
		contextualMessage?: string;
		innerError?: Error;
		contextualData?: { [key: string]: any };
	}) {
		const { error: e, contextualMessage, innerError, contextualData } = args;
		super();

		this.error = e;
		this.message = e.message;
		this.httpCode = e.httpCode;
		this.contextualMessage = contextualMessage;
		this.innerError = innerError;

		let mergedContextualData;

		if (innerError instanceof ServiceError && innerError.contextualData) {
			mergedContextualData = {
				...innerError.contextualData,
				...contextualData,
			};
		}

		this.contextualData = mergedContextualData ? mergedContextualData : contextualData;
	}

	/**
	 * Logs the error with the correct level and details
	 *
	 * @param serviceCtx
	 */
	log() {
		if (process.env.ENV_ID === 'test') {
			return;
		}

		let message = this.message;

		if (this.contextualMessage) {
			message = `${message}; ${this.contextualMessage}`;
		}

		const stackError = this.buildStackError();
		const options = {
			contextual_data: this.contextualData,
		};

		switch (this.error.severity) {
			case ErrorSeverity.High:
				console.error(message, stackError, options);
				break;

			case ErrorSeverity.Medium:
				console.warn(message, stackError, options);
				break;

			case ErrorSeverity.Low:
				console.info(message, stackError, options);
				break;
		}
	}

	/**
	 * Builds an error containing a stack of all the encapsulated errors
	 */
	buildStackError() {
		const error = new Error(this.toString());
		const stack: (string | undefined)[] = [this.stack];

		/*eslint-disable consistent-this*/
		let currError: Error | undefined = this;

		while (currError instanceof ServiceError && currError.innerError) {
			stack.push(currError.innerError.stack);

			currError = currError.innerError;
		}

		error.stack = stack.join('\n\nCaused by: ');

		return error;
	}
}
