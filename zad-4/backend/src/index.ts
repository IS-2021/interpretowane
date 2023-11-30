import * as console from "console";
import Fastify from "fastify";
import cors, { type FastifyCorsOptionsDelegateCallback } from "@fastify/cors";
import { apiRouter } from "@/api/apiRouter";
import { getLoggerFromEnv } from "@/logger";

const ADMIN_PORT = "5500";
const publicURLs = {
	GET: ["/products", "/categories"] as const,
	POST: ["/orders"] as const,
	OPTIONS: ["/orders"] as const,
};

const fastify = Fastify({
	logger: getLoggerFromEnv(),
});

await fastify.register(cors, (): FastifyCorsOptionsDelegateCallback => {
	return (req, callback) => {
		const corsOptions = {
			origin: false,
			credentials: true,
		};

		const origin = new URL(req.headers.origin as string);
		if (origin.port === ADMIN_PORT) {
			console.log("Admin access detected");
			console.log(req.method, req.url);
			corsOptions.origin = true;
		} else if (req.method in publicURLs) {
			const routes = publicURLs[req.method];
			if (!routes) {
				callback(new Error("Invalid method"));
				return;
			}

			if (routes.includes(req.url)) {
				corsOptions.origin = true;
			}
		}

		callback(null, corsOptions);
	};
});
await fastify.register(apiRouter);

try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	console.error(err);
	process.exit(1);
}
