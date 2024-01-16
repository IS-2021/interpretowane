import { baseApiUrl } from "./constants";
import { ApplicationError } from "@/lib/error";

export class FetchError extends ApplicationError {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export class ApiError extends FetchError {
	response: Response;

	constructor(message: string, res: Response, options?: ErrorOptions) {
		super(message, options);
		this.response = res;
	}
}

export class NetworkError extends FetchError {
	constructor(message: string, options?: ErrorOptions) {
		super(message, options);
	}
}

export async function customFetch(input: RequestInfo | URL, init?: RequestInit) {
	let initOptions = init;

	if (init?.body) {
		initOptions = {
			...initOptions,
			headers: {
				"Content-Type": "application/json",
				...initOptions?.headers,
			},
		};
	}

	try {
		const res = await fetch(input, initOptions);
		if (!res.ok) {
			throw new ApiError("Bad response", res);
		}
		return res;
	} catch (err) {
		if (err instanceof TypeError) {
			console.error(err?.message);
			throw new NetworkError("No network connection");
		}
		throw err;
	}
}

export const fetcher = (url: string | URL) =>
	customFetch(new URL(url, baseApiUrl)).then((res) => res.json());
