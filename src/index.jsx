import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { corsMiddleware } from './middlewares/cors.js';
import { createUserRouter } from './routes/users.js';
import { createMovieRouter } from './routes/movies.js';
import { envMiddleware } from './middlewares/env.js';
// /*global   */
const createApp = ({ models }) => {
	const app = new Hono();
	app.use('*', prettyJSON());
	app.use('*', corsMiddleware());
	app.use('*', (c, next) => envMiddleware(c, next, models));
	createUserRouter({ route: app.route('/users'), model: models.userModel });
	createMovieRouter({ route: app.route('/movies'), model: models.movieModel });
	app.get('/', (c) => { return c.json({ healt: c.env.HEALTH || process.env.HEALTH }); });

	return app;
};

export default createApp;
