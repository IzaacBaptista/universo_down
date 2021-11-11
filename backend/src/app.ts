/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import * as cors from 'cors'

import { apiDoc } from './api/docs/doc'
import { Route } from './api/route'
import config from './config'
import dbConnection from './database'
import logger from './fns/logger'
// Create and setup express app
logger.info(`Process id: ${process.pid}`)
const api = JSON.stringify(apiDoc)

const allowedOrigins = ['http://127.0.0.1:5501']

const options: cors.CorsOptions = {
    origin: allowedOrigins
}

const app = express()
app.use(cors(options))
app.use(express.json())
// Register routes
Route.getRoutes(app)

const swaggerJson = JSON.parse(api) as swaggerUi.JsonObject
app.use(
    '/',
    swaggerUi.serve,
    swaggerUi.setup(swaggerJson)
)
async function run() {
    await dbConnection

    // Start express server
    app.listen(config.port)
    logger.info(`Using config: ${JSON.stringify(config)}`)
    logger.info(`Aplication Running on Port: ${config.port}`)
}

export default run().catch((err: Error) => {
    logger.error(err)

    process.exit(1)
})
