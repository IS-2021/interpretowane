import { env } from "@/env";

export function getLoggerFromEnv() {
	const envToLogger = {
		development: {
			transport: {
				target: "pino-pretty",
				options: {
					translateTime: "HH:MM:ss Z",
					ignore: "pid,hostname",
				},
			},
		},
		production: true,
	};

	return envToLogger[env.NODE_ENV];
}
