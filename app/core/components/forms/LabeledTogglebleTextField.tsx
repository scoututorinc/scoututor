import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef, useState } from 'react'
import { useField, UseFieldConfig } from 'react-final-form'
import { useId } from '@reach/auto-id'

import { Input, InputLeftElement, InputGroup } from '@chakra-ui/input'
import { Icon, VStack, Heading, Button, IconButton } from '@chakra-ui/react'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { IconType } from 'react-icons'
import { MdSettingsInputAntenna } from 'react-icons/md'

export interface LabeledTogglebleTextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number'
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
  labelProps?: ComponentPropsWithoutRef<'label'>
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTogglebleTextField = forwardRef<
  HTMLInputElement,
  LabeledTogglebleTextFieldProps
>(
  (
    { name, label, outerProps, icon_toggled, icon_untoggled, fieldProps, labelProps, ...props },
    ref
  ) => {
    const {
      input,
      meta: { touched, error, submitError, submitting }
    } = useField(name, {
      //Converting `""` to `null` ensures empty values will be set to null in the DB
      parse: props.type === 'number' ? (Number as any) : (v) => (v === '' ? null : v),
      ...fieldProps
    })

    const id = useId() + 'name'

    const normalizedError = Array.isArray(error) ? error.join(', ') : error || submitError

    const [toggled, setToggled] = useState(false)

    return (
      <FormControl {...outerProps}>
        <FormLabel {...labelProps} fontWeight='bold'>
          {label}
        </FormLabel>
        <InputGroup id={id}>
          <InputLeftElement>
            <IconButton
              aria-label='Toggled field'
              colorScheme='teal'
              variant='ghost'
              size='2xs'
              icon={toggled ? <AiFillUnlock /> : <AiFillLock />}
              onClick={() => {
                toggled ? setToggled(false) : setToggled(true)
              }}
            ></IconButton>
          </InputLeftElement>
          <Input {...input} disabled={!toggled} {...props} ref={ref} focusBorderColor='teal.400' />
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
