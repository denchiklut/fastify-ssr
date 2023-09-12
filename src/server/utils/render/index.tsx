import type { FastifyPluginAsync } from 'fastify'
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider
} from 'react-router-dom/server'

import { basename } from 'src/common'
import { createFetchRequest } from 'server/utils'
import { getApp, getStats, getHtml } from './utils'

export const renderApp: FastifyPluginAsync = async fastify => {
	fastify.get('*', async (req, res) => {
		const chunkExtractor: ChunkExtractor = new ChunkExtractor(getStats(fastify))
		const { App, routes } = getApp(fastify)

		const { query } = createStaticHandler(routes)
		const webRequest = createFetchRequest(req)
		const context = await query(webRequest)

		if (context instanceof Response) {
			return res.redirect(context.status, context.url)
		}

		context.basename = basename

		const jsx = chunkExtractor.collectChunks(
			<App>
				<StaticRouterProvider
					router={createStaticRouter(routes, context)}
					context={context}
				/>
			</App>
		)

		return res
			.type('text/html')
			.send(getHtml(renderToString(jsx), chunkExtractor))
	})
}
