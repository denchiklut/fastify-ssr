import { clsx } from 'clsx'
import { type FC, useEffect, useRef } from 'react'
import { useFormControl } from '../form-control'
import { NotchedOutline } from './notched-outline'
import css from './styles.css'

interface Props {
	size?: 'small' | 'medium'
	placeholder?: string
}
export const OutlinedInput: FC<Props> = ({ placeholder, size }) => {
	const formControl = useFormControl()
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (inputRef.current?.value) formControl?.onFilled()
		else formControl?.onEmpty()
	}, [inputRef.current?.value])

	return (
		<div className={css.inputBaseRoot}>
			<input
				type='text'
				ref={inputRef}
				placeholder={placeholder}
				onFocus={formControl?.onFocus}
				onBlur={formControl?.onBlur}
				className={clsx(css.input, {
					[css.placeholderHidden!]: formControl && !formControl.focused,
					[css.small!]: formControl?.size === 'small' || size == 'small'
				})}
			/>
			<NotchedOutline
				label={!formControl?.hiddenLabel && formControl?.label}
				notched={formControl?.filled || formControl?.focused}
			/>
		</div>
	)
}
