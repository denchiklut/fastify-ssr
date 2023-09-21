import type { FC } from 'react'
import { clsx } from 'clsx'
import { useFormControl } from '../form-control'
import css from './styles.css'

interface Props {
	children?: string
}
export const FormHelperText: FC<Props> = ({ children }) => {
	const formControl = useFormControl()
	if (!children) return null

	return (
		<p
			className={clsx(css.formHelperText, {
				[css.resetMargin!]: !formControl
			})}
		>
			{children}
		</p>
	)
}
