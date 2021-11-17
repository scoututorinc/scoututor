import React from 'react'
import { useField } from 'react-final-form'
import { Checkbox, FormControl, FormErrorMessage } from '@chakra-ui/react'

export interface LabeledCheckboxFieldProps {
  name: string
  label: string
}

export const LabeledCheckboxField = ({ name, label }: LabeledCheckboxFieldProps) => {
  const {
    input: { checked, ...input },
    meta: { error, touched, invalid }
  } = useField(name, {
    type: 'checkbox'
  })

  return (
    <FormControl isInvalid={touched && invalid} my={4}>
      <Checkbox {...input} isChecked={checked} isInvalid={touched && invalid} my={4}>
        {label}
      </Checkbox>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}
