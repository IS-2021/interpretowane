/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [react(), viteTsconfigPaths()],
	test: {
		globals: true,
		environment: "jsdom",
		alias: {
			"@/": new URL("./src/", import.meta.url).pathname,
		},
		setupFiles: ["./src/tests/setup.ts"],
	},
});
