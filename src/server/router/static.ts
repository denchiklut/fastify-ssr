import { resolve } from 'path'
import { Router, static as staticRoute } from 'express'

export function staticRoutes(router: Router) {
	const distClient = resolve(__dirname, '../client')
	router.use(staticRoute(IS_DEV ? 'assets' : distClient))
}
