import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import TailwindAnimatePlugin from "tailwindcss-animate";

const config: Config = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				primary: colors.green["500"],
				success: colors.green["500"],
				warning: colors.orange["500"],
				error: colors.red["500"],
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [TailwindAnimatePlugin],
};
export default config;
