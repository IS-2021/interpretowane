import { type TestContext } from "vitest";

export type Fixture<T> = (
	context: TestContext,
	use: (fixture: T) => Promise<void>,
) => Promise<void>;
