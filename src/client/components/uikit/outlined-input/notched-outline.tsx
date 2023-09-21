import { clsx } from 'clsx'
import type { FC, ReactNode } from 'react'
import css from './styles.css'

interface Props {
	notched?: boolean
	label?: ReactNode
}
export const NotchedOutline: FC<Props> = ({ notched, label }) => (
	<fieldset aria-hidden className={css.fieldset}>
		<legend className={clsx(css.legend, { [css.legendActive!]: notched })}>
			{label && <span>{label}</span>}
		</legend>
	</fieldset>
)
