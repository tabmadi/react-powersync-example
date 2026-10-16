import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	optimizeDeps: {
		include: ["@powersync/web > js-logger"],
		exclude: ["@journeyapps/wa-sqlite", "@powersync/web", "@powersync/react"],
		esbuildOptions: {
			target: "esnext",
		},
	},
	build: {
		target: "esnext",
	},
	plugins: [react()],
	worker: {
		format: "es",
	},
});
