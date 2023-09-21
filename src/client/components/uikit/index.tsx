import { TextField } from './text-field'
import { InputLabel } from './input-label'
import { OutlinedInput } from './outlined-input'
import { FormHelperText } from './form-helper-text'
import css from './styles.css'

export const Uikit = () => (
	<div className={css.container}>
		<fieldset className={css.group}>
			<legend>TextFields</legend>
			<TextField size='small' label='Otlined' placeholder='example' helperText='helper text' />
			<TextField label='Otlined' placeholder='example' helperText='helper text' />
		</fieldset>

		<fieldset className={css.group}>
			<legend>OutlinedInputs</legend>
			<OutlinedInput placeholder='placeholder' size='small' />
			<OutlinedInput placeholder='placeholder' />
		</fieldset>

		<form>
			<InputLabel>Label</InputLabel>
			<OutlinedInput placeholder='placeholder' />
			<FormHelperText>Helper text</FormHelperText>
		</form>

		<form>
			<InputLabel>Label</InputLabel>
			<OutlinedInput placeholder='placeholder' size='small' />
			<FormHelperText>Helper text</FormHelperText>
		</form>
	</div>
)
