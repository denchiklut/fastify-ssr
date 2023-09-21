import { join, resolve } from 'path'
import type { FC, ReactNode } from 'react'
import type { RouteObject } from 'react-router-dom'
import { ChunkExtractorOptions } from '@loadable/server'
import requireFromString from 'require-from-string'
import type { FastifyInstance } from 'fastify'
import type { Stats, MultiCompiler, OutputFileSystem } from 'webpack-dev-middleware'

import type { ChunkExtractor } from '@loadable/server'
import { getENV, publicPath, setEnvVars } from 'src/common'

export const getHtml = (reactHtml: string, chunkExtractor: ChunkExtractor) => {
	const appVersion = getENV('APP_VERSION')
	const scriptTags = chunkExtractor.getScriptTags()
	const linkTags = chunkExtractor.getLinkTags()
	const styleTags = chunkExtractor.getStyleTags()

	return `
<!DOCTYPE html>
<html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>SSR app</title>
        <meta name='data-app-version' content='${appVersion}'>
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
        <link rel='icon' type='image/x-icon' href='${publicPath('static/icons/favicon.ico')}'>
        <link rel='apple-touch-icon' href='${publicPath('static/icons/maskable.png')}'>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <meta name='theme-color' content='#efefef'>
        ${linkTags}
        ${styleTags}
        ${setEnvVars()}
    </head>
    <body>
        <div id='root'>${reactHtml}</div>
        ${scriptTags}
    </body>
</html>`
}

interface FastifyApp extends FastifyInstance {
	webpack?: {
		dev: {
			context: {
				compiler: MultiCompiler
				webpackStats: Stats
			}
		}
	}
}

export const getApp = (app: FastifyApp) => {
	if (IS_PROD) return require('../client/js/app.server.js')

	const devCtx = app.webpack?.dev.context
	const compiler = devCtx?.compiler.compilers.find(c => c.name === 'server')
	if (!compiler) throw Error('Webpack config is unsuitable for SSR')

	const stats = devCtx?.webpackStats.toJson()
	const statsCompilation = stats?.children?.find(c => c.name === 'server')
	if (!statsCompilation) throw Error('Webpack config is unsuitable for SSR')

	const outputFileSystem = compiler.outputFileSystem as OutputFileSystem
	const { assetsByChunkName, outputPath } = statsCompilation
	const serverAppFileName = assetsByChunkName?.main?.find(chunk => chunk === 'js/app.server.js')

	if (!(serverAppFileName && outputPath && outputFileSystem?.readFileSync)) {
		throw Error('Render file not found')
	}

	return requireFromString(
		outputFileSystem.readFileSync(join(outputPath, serverAppFileName), 'utf-8')
	) as { App: FC<{ children: ReactNode }>; routes: RouteObject[] }
}

export const getStats = (app: FastifyApp): ChunkExtractorOptions => {
	if (IS_PROD) {
		return {
			statsFile: resolve(__dirname, '../client/loadable-stats.json'),
			publicPath: publicPath('static')
		}
	}

	const multiStats = app?.webpack?.dev.context.webpackStats.toJson()
	const stats = multiStats?.children?.find(child => child.name === 'client')
	if (!stats) throw Error('Webpack config is unsuitable for SSR')

	return { stats, publicPath: publicPath('/') }
}
