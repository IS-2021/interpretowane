import { Kysely, PostgresDialect } from "kysely";
import { type DB } from "kysely-codegen";
import pg from "pg";
import { env } from "@/env";

export const db = new Kysely<DB>({
	dialect: new PostgresDialect({
		pool: new pg.Pool({
			connectionString: env.DATABASE_URL,
		}),
	}),
});
