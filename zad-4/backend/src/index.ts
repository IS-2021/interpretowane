import Fastify from "fastify";
import { apiRouter } from "@/api/apiRouter";
import { getLoggerFromEnv } from "@/logger";

const fastify = Fastify({
	logger: getLoggerFromEnv(),
});

await fastify.register(apiRouter);

try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	console.error(err);
	process.exit(1);
}
