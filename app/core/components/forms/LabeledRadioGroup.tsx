import { useId } from '@reach/auto-id'
import { Field } from 'react-final-form'

import {
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormErrorMessage,
  Stack
} from '@chakra-ui/react'
import { ComponentPropsWithoutRef } from 'react'

export interface LabeledRadioGroupProps {
  name: string
  label: string
  type?: 'string' | 'number'
  children: any
}

export const LabeledRadioGroup = ({ name, label, type, ...props }: LabeledRadioGroupProps) => {
  return (
    <Field
      {...(type === 'number'
        ? { parse: (v: string) => Number(v) }
        : (v: string, _name: string) => (v === '' ? null : v))}
      name={name}
      component={AdaptedRadioGroup}
      label={label}
    >
      {props.children}
    </Field>
  )
}

const AdaptedRadioGroup = ({ input, meta, label, children }) => (
  <FormControl isInvalid={meta.touched && meta.invalid} my={4}>
    <FormLabel htmlFor={input.name}>{label}</FormLabel>
    <RadioGroup {...input}>{children}</RadioGroup>
    <FormErrorMessage>{meta.error}</FormErrorMessage>
  </FormControl>
)

export interface SelectFieldProps extends ComponentPropsWithoutRef<typeof Radio> {
  name: string
  label: string
}

export const LabeledRadioField = ({ name, value, label, ...props }) => {
  return (
    <Radio name={name} value={value} {...props}>
      {label}
    </Radio>
  )
}

//? How to use
/* <LabeledRadioGroup name='radiovalue' label='Pick a number' type='string'>
  <Stack spacing={4} direction='column'>
    <LabeledRadioField name='radiovalue' label='uno' value='uno'/>
    <LabeledRadioField name='radiovalue' label='dos' value='dos'/>
    <LabeledRadioField name='radiovalue' label='tres' value='tres'/>
  </Stack>
</LabeledRadioGroup> */
