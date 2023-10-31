import Fastify from "fastify";
import { apiRouter } from "@/api/apiRouter";

const fastify = Fastify({
	logger: true,
});

await fastify.register(apiRouter);

try {
	await fastify.listen({ port: 3000 });
} catch (err) {
	console.error(err);
	process.exit(1);
}
