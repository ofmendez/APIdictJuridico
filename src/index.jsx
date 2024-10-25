import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { bearerAuth } from 'hono/bearer-auth';
import { logMiddleware } from './middlewares/log.js';
import { corsMiddleware } from './middlewares/cors.js';
import { getStatistics } from './middlewares/statistics.js';
import { createUserRouter } from './routes/users.js';
import { createMovieRouter } from './routes/movies.js';
import { createTermRouter } from './routes/terms.js';
import { handleLogin } from './helpers/Auth.js';
import { UserController } from './controllers/users.js';
import { connect, closeClient } from './controllers/mongoClient.js';

// /*global   */
const createApp = ({ models }) => {
	const app = new Hono();
	Object.values(models).forEach((model) => model.setEnv(connect, closeClient));

	app.use('*', logMiddleware);
	app.use('*', corsMiddleware());
	app.get('/', (c) => { return c.json({ healt: c.env.HEALTH || process.env.HEALTH }); });
	app.get('/statistics/*', (c) => getStatistics({ c, models }));
	const userController = new UserController({ model: models.userModel });
	app.get('/login', (c) => handleLogin({ c, userController }));

	app.use('*', bearerAuth({ token: `${process.env.TOKEN}` }));
	app.use('*', prettyJSON());
	createUserRouter({ route: app.route('/users'), userController });
	createMovieRouter({ route: app.route('/movies'), model: models.movieModel });
	createTermRouter({ route: app.route('/terms'), model: models.termModel });

	return {
		fetch: app.fetch,
		port: 3000
	};
};

export default createApp;
