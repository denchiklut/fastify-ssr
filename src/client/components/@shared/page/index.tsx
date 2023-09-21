import type { FC, ReactNode } from 'react'

interface Props {
	children: ReactNode
}
export const Page: FC<Props> = ({ children }) => {
	return <div style={{ padding: 24 }}>{children}</div>
}
