import { Hono } from 'hono';
import { prettyJSON } from 'hono/pretty-json';
import { corsMiddleware } from './middlewares/cors.js';
import { createUserRouter } from './routes/users.js';
// import { serve } from "@hono/node-server";
/*global   */

const createApp = ({ userModel }) => {
    
    const app = new Hono();
    app.use('*', prettyJSON());
    app.use('*',corsMiddleware());
    const user = app.route('/users');

    createUserRouter({ user, userModel });

    app.get('/', (c) => {
        return c.render( '<h1>Fabian! _ 2</h1>' );
    });
    
    // serve(app, (info) => {
    //     console.log(`Listening on http://localhost:${info.port}`); 
    // });

    return app;
};
export default createApp;