import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://localhost:7000/', // The URL of your backend server
				changeOrigin: true, // Rewrites the Host header to match the target
			},
		},
	},
});
