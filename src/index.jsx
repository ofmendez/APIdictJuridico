import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { bearerAuth } from 'hono/bearer-auth';
import { corsMiddleware } from './middlewares/cors.js';
import { createUserRouter } from './routes/users.js';
import { createMovieRouter } from './routes/movies.js';
import { createTermRouter } from './routes/terms.js';
import { logMiddleware } from './middlewares/log.js';
import { handleLogin } from './helpers/Auth.js';

// /*global   */
const createApp = ({ models }) => {
	const app = new Hono();

	app.use('*', logMiddleware);
	app.use('*', corsMiddleware());
	app.get('/', (c) => { return c.json({ healt: c.env.HEALTH || process.env.HEALTH }); });
	app.get('/login', handleLogin);

	app.use('*', bearerAuth({ token: `${process.env.TOKEN}` }));
	app.use('*', prettyJSON());
	createUserRouter({ route: app.route('/users'), model: models.userModel });
	createMovieRouter({ route: app.route('/movies'), model: models.movieModel });
	createTermRouter({ route: app.route('/terms'), model: models.termModel });

	return app;
};

export default createApp;
