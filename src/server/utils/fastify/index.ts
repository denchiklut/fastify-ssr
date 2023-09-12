import { existsSync, readFileSync } from 'fs'
import Fastify, { type FastifyInstance } from 'fastify'

export const fastify = (): FastifyInstance => {
	const key = 'certs/key.pem'
	const cert = 'certs/cert.pem'
	const sslIsExist = existsSync(cert) && existsSync(key)

	const app = Fastify({
		logger: false,
		...(sslIsExist && {
			https: { key: readFileSync(key), cert: readFileSync(cert) }
		})
	})

	if (IS_DEV) {
		const webpack = require('webpack')
		const hmr = require('fastify-webpack-hmr')
		const configs = require('../../../../webpack.config').default
		const publicPath = configs[1]?.output?.publicPath
		const compiler = webpack(configs.slice(1))

		app.register(hmr, { compiler, webpackDev: { publicPath } })
	}

	return app
}
