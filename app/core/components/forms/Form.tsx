import React, { ReactNode, PropsWithoutRef } from 'react'
import { Form as FinalForm, FormProps as FinalFormProps } from 'react-final-form'
import { z } from 'zod'
import { validateZodSchema } from 'blitz'
import { Box } from '@chakra-ui/react'
export { FORM_ERROR } from 'final-form'

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<typeof Box>, 'onSubmit'> {
  children?: ReactNode
  submitText?: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>['onSubmit']
  initialValues?: FinalFormProps<z.infer<S>>['initialValues']
}

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={validateZodSchema(schema)}
      onSubmit={onSubmit}
      // debug={console.log}
      render={({ handleSubmit, submitting, submitError, values }) => (
        <Box as='form' p={4} onSubmit={handleSubmit} {...props}>
          {children}

          {submitError && (
            <div role='alert' style={{ color: 'red' }}>
              {submitError}
            </div>
          )}

          {submitText && (
            <button type='submit' disabled={submitting}>
              {submitText}
            </button>
          )}
          <Box as='pre' my={10}>
            {JSON.stringify(values, null, 2)}
          </Box>
        </Box>
      )}
    />
  )
}

export default Form
