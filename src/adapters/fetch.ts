import * as fetch from 'node-fetch';

export async function request(args: {
	url: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: string;
	headers?: Record<string, string>;
}) {
	const { url, method, body, headers } = args;
	const response = await fetch.default(url, {
		method,
		body,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	});

	const data = await response.json();

	return data;
}
