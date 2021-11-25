import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { useId } from '@reach/auto-id'

import { InputGroup } from '@chakra-ui/input'
import { Textarea, Heading, VStack } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'

export interface TextAreaProps extends ComponentPropsWithoutRef<typeof Textarea> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
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
        <FormLabel {...labelProps}>
          <InputGroup>
            <VStack spacing={1} alignItems='start' width='100%'>
              <Heading size='sm'>{label}</Heading>
              <Textarea
                {...input}
                disabled={submitting}
                {...props}
                ref={ref}
                focusBorderColor='teal.400'
              />
            </VStack>
          </InputGroup>
        </FormLabel>
        {touched && normalizedError && (
          <div role='alert' style={{ color: 'red' }}>
            {normalizedError}
          </div>
        )}
      </FormControl>
    )
  }
)
