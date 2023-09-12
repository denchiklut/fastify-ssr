import type { FastifyRequest } from 'fastify'

export const createFetchHeaders = (
	requestHeaders?: FastifyRequest['headers']
): Headers => {
	const headers = new Headers()

	for (const [key, values] of Object.entries(requestHeaders ?? {})) {
		if (values) {
			if (Array.isArray(values)) {
				for (const value of values) {
					headers.append(key, value)
				}
			} else {
				headers.set(key, values)
			}
		}
	}

	return headers
}

export const createFetchRequest = (req: FastifyRequest): Request => {
	const origin = `${req.protocol}://${req.hostname}`
	const url = new URL(req.url, origin)

	const controller = new AbortController()

	req.raw.on('close', () => {
		controller.abort()
	})

	const init: RequestInit = {
		method: req.method,
		headers: createFetchHeaders(req.headers),
		signal: controller.signal
	}

	if (req.method !== 'GET' && req.method !== 'HEAD') {
		init.body = JSON.stringify(req.body)
	}

	return new Request(url.href, init)
}
