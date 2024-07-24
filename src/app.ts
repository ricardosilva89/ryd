import { Server } from 'http';
import Koa from 'koa';
import { initPoiRoutes } from './routes/poi';

const PORT = process.env.PORT || 3000;
let server: Server;

export async function createApp() {
	try {
		const app = new Koa();
		initPoiRoutes(app);

		server = app.listen(PORT, () => {
			if (process.env.ENV_ID !== 'test') {
				console.log(`Server running on port ${PORT} \n`);
			}
		});

		return server;
	} catch (error) {
		console.error(error);
	}
}

process.on('SIGINT', () => {
	console.log('Shutting down server...');

	server.close(() => {
		console.log('Server closed');
		process.exit(0);
	});
});
