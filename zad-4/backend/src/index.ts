import Fastify from "fastify";
import cors from "@fastify/cors";
import { apiRouter } from "@/api/apiRouter";
import { getLoggerFromEnv } from "@/logger";

const fastify = Fastify({
	logger: getLoggerFromEnv(),
});

await fastify.register(cors, {
	origin: true,
});
await fastify.register(apiRouter);

try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	console.error(err);
	process.exit(1);
}
