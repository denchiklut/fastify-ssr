import type { FC } from 'react'
import { clsx } from 'clsx'
import css from './styles.css'
import { useFormControl } from '../form-control'
import { useEffect } from 'react'

export interface InputLabelProps {
	children?: string
}
export const InputLabel: FC<InputLabelProps> = ({ children }) => {
	const formControl = useFormControl()

	useEffect(() => {
		if (children) formControl?.setLabel(children)
	}, [children])

	return (
		<label
			className={clsx(css.label, {
				[css.labelAbsolute!]: !!formControl,
				[css.labelActive!]: formControl?.focused || formControl?.filled,
				[css.small!]: formControl?.size === 'small'
			})}
		>
			{children}
		</label>
	)
}
