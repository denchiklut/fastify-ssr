import express from './webpack/configs/fastify.config'
import server from './webpack/configs/server.config'
import client from './webpack/configs/client.config'

export default [express, client, server]
