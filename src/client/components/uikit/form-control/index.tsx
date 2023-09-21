import {
	createContext,
	type ReactNode,
	type FC,
	useContext,
	useState
} from 'react'
import css from './styles.css'

const FormControlContext = createContext<
	Nullable<{
		size?: 'small' | 'medium'
		label?: string
		hiddenLabel?: boolean
		filled: boolean
		focused: boolean
		setLabel: (l: string) => void
		onFilled: () => void
		onFocus: () => void
		onBlur: () => void
		onEmpty: () => void
	}>
>(null)

export const useFormControl = () => useContext(FormControlContext)

interface FormControlProps {
	hiddenLabel?: boolean
	size?: 'small' | 'medium'
	variant?: 'filled' | 'outlined' | 'standard'
	children: ReactNode
}
export const FormControl: FC<FormControlProps> = ({
	size,
	hiddenLabel,
	children
}) => {
	const [filled, setFilled] = useState(false)
	const [focused, setFocused] = useState(false)
	const [label, setLabel] = useState('')

	return (
		<FormControlContext.Provider
			value={{
				size,
				filled,
				focused,
				label,
				setLabel,
				hiddenLabel,
				onFilled: () => setFilled(true),
				onEmpty: () => setFilled(false),
				onFocus: () => setFocused(true),
				onBlur: () => setFocused(false)
			}}
		>
			<div className={css.formControlRoot}>{children}</div>
		</FormControlContext.Provider>
	)
}
