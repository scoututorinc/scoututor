import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'

import { Input, InputLeftElement, InputGroup } from '@chakra-ui/input'
import { Icon } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { AiOutlineMail } from 'react-icons/ai'
import { IconType } from 'react-icons'

export interface LabeledTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  icon?: IconType
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number'
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting }
    } = useField(name, {
      // Converting `""` to `null` ensures empty values will be set to null in the DB
      parse: props.type === 'number' ? (Number as any) : (v) => (v === '' ? null : v),
      ...fieldProps
    })

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps}>
          <InputGroup>
            <InputLeftElement>
              <Icon as={props.icon} color="teal.400" />
            </InputLeftElement>
            <Input
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
              focusBorderColor="teal.400"
            />
          </InputGroup>
        </FormLabel>
        {touched && normalizedError && (
          <div role="alert" style={{ color: 'red' }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)

export default LabeledTextField
