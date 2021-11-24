import React, { ComponentPropsWithoutRef, useState } from 'react'
import { useField } from 'react-final-form'
import { Checkbox, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'

export interface LabeledCheckboxArrayProps extends ComponentPropsWithoutRef<typeof FormControl> {
  name: string
  label: string
}

export const LabeledCheckboxArray = ({
  name,
  label,
  children,
  ...props
}: LabeledCheckboxArrayProps) => {
  const {
    meta: { error, touched }
  } = useField(name, { subscription: { touched: true, error: true } })
  return (
    <FormControl {...props} isInvalid={error && touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  )
}

export const CheckboxArrayControl = ({ name, value, label }) => {
  const {
    input: { checked, ...input },
    meta: { error, touched }
  } = useField(name, {
    type: 'checkbox',
    value
  })
  return (
    <Checkbox {...input} isChecked={checked} isInvalid={error && touched}>
      {label}
    </Checkbox>
  )
}

// ? How to Use
/* <LabeledCheckboxArray name='toppings' label='toppings' my={4}>
<Stack pl={6} mt={1} spacing={1}>
  <CheckboxArrayControl name='toppings' label='🐓 Chicken' value='chicken' />
  <CheckboxArrayControl name='toppings' label='🐷 Ham' value='ham' />
  <CheckboxArrayControl name='toppings' label='🍄 Mushrooms' value='mushrooms' />
  <CheckboxArrayControl name='toppings' label='🧀 Cheese' value='cheese' />
  <CheckboxArrayControl name='toppings' label='🐟 Tuna' value='tuna' />
  <CheckboxArrayControl name='toppings' label='🍍 Pineapple' value='pineapple' />
</Stack>
</LabeledCheckboxArray> */
