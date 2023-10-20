import { createFormElement } from 'components/form'
import { Textarea, TextareaProps } from 'components/Textarea'
import { Input, InputProps } from '../Input'

export const FormInput = createFormElement<InputProps>(Input)
export const FormTextarea = createFormElement<TextareaProps>(Textarea)
