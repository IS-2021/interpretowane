import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		NODE_ENV: z.union([z.literal("production"), z.literal("development"), z.literal("test")]),
	},
	runtimeEnv: process.env,
});
