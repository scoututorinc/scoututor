import React, { ComponentPropsWithoutRef, PropsWithoutRef } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { useId } from '@reach/auto-id'
import { FormControl, FormLabel, InputGroup, Select } from '@chakra-ui/react'

export interface SelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  name: string
  label: string
  type?: 'text' | 'number'
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ name, label, fieldProps, icon, outerProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting }
    } = useField(name, {
      ...((props.type === 'number'
        ? { parse: (v: string) => Number(v) }
        : {
            parse: (v: string) => (v === '' ? null : v)
          }) as any),
      ...fieldProps
    })

    const id = name + useId()

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError
    const showError = touched && normalizedError

    return (
      <FormControl id={id} {...outerProps}>
        <FormLabel {...labelProps}>
          <InputGroup>
            <Select
              id={id}
              key={id}
              {...input}
              disabled={submitting}
              {...props}
              ref={ref}
              focusBorderColor='teal.400'
            />
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

//? How to use
/* <SelectField name='type' label='Type' placeholder='Select one' type='text'>
  <option value='volvo'>Volvo</option>
  <option value='saab'>Saab</option>
  <option value='mercedes'>Mercedes</option>
  <option value='audi'>Audi</option>
</SelectField> */
