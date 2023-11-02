import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/users.js'
// import 'dotenv/config'
/*global Bun, process */
export const createApp = ({ userModel }) => {
    // const app = express()
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
    const PORT = process.env.PORT ?? 5000

    // app.listen(PORT, () => {
    //     console.log(`server listening on port http://localhost:${PORT}`)
    // })

    const server = Bun.serve({
        port: PORT,
        fetch: app.fetch,
    });

    console.log(`Listeniiing on localhost:${server.port}`);

}