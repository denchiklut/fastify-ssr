import type { FC } from 'react'
import { FormControl } from '../form-control'
import { OutlinedInput } from '../outlined-input'
import { FormHelperText } from '../form-helper-text'
import { InputLabel } from '../input-label'

interface TextFieldProps {
	helperText?: string
	hiddenLabel?: boolean
	placeholder?: string
	size?: 'small' | 'medium'
	variant?: 'filled' | 'outlined' | 'standard'
	label?: string
}
export const TextField: FC<TextFieldProps> = ({
	helperText,
	hiddenLabel,
	placeholder,
	variant = 'outlined',
	size = 'medium',
	label
}) => {
	return (
		<FormControl hiddenLabel={hiddenLabel} variant={variant} size={size}>
			<InputLabel>{label}</InputLabel>
			<OutlinedInput placeholder={placeholder} />
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	)
}
