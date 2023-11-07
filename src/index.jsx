import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { corsMiddleware } from './middlewares/cors.js';
import { createUserRouter } from './routes/users.js';
import { createMovieRouter } from './routes/movies.js';
// /*global   */

const createApp = ({ userModel, movieModel }) => {
	const app = new Hono();
	app.use('*', prettyJSON());
	app.use('*', corsMiddleware());

	createUserRouter({ user: app.route('/users'), userModel });
	createMovieRouter({ movie: app.route('/movies'), movieModel });

	app.get('/', (c) => { return c.json({ healt: process.env.HEALTH }); });
	return app;
};

export default createApp;
