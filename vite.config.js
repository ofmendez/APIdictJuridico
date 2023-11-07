import { defineConfig } from 'vite';
import devServer from '@hono/vite-dev-server';
import pages from '@hono/vite-cloudflare-pages';

export default defineConfig({
	server: {
		port: 3000
	},
	plugins: [
		pages(),
		devServer({
			entry: 'src/environment/prod.js'
		})
	]
});
