import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { useId } from '@reach/auto-id'

import { InputGroup } from '@chakra-ui/input'
import { Textarea, Heading, VStack } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'

export interface TextAreaProps extends ComponentPropsWithoutRef<typeof Textarea> {
  name: string
  label: string
  placeholder: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, label, placeholder, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting }
    } = useField(name, {
      // Converting `""` to `null` ensures empty values will be set to null in the DB
      parse: (v) => (v === '' ? null : v),
      ...fieldProps
    })

    const id = useId() + 'name'

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

    return (
      <FormControl id={id} {...outerProps}>
        <FormLabel {...labelProps} fontWeight='bold'>
          {label}
        </FormLabel>
        <InputGroup>
          <Textarea
            {...input}
            disabled={submitting}
            {...props}
            placeholder={placeholder}
            ref={ref}
            focusBorderColor='teal.400'
          />
        </InputGroup>

        {touched && normalizedError && (
          <div role='alert' style={{ color: 'red' }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)
