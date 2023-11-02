import { Hono } from 'hono'
import { serve } from "@hono/node-server";
import { prettyJSON } from 'hono/pretty-json'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/users.js'
/*global   */

export const createApp = ({ userModel }) => {
    
    const app = new Hono()

    app.use('*', prettyJSON()) 
    app.use('*',corsMiddleware())
    // app.disable('x-powered-by')
    const user = app.route('/users')

    createUserRouter({ user, userModel })
    app.use('/', () => {
        return {
            status: 200,
            body: 'Hello World'
        }
    });

    serve(app, (info) => {
        console.log(`Listening on http://localhost:${info.port}`); 
    });

}