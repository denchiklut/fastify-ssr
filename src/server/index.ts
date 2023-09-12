import { resolve } from 'path'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'

import { fastify, renderApp } from 'server/utils'
import { logger } from 'src/common'

export const app = fastify()
	.register(cors)
	.register(fastifyStatic, {
		root: resolve(__dirname, IS_DEV ? '../../assets' : '../client'),
		prefix: '/static'
	})
	.register(renderApp)
	.listen({ port: 3000 })
	.then(address => logger.info(`Application is started on 🌎 ${address}`))
