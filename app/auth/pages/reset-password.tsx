import { BlitzPage, useRouterQuery, Link, useMutation, Routes } from 'blitz'
import LoggedOutLayout from 'app/core/layouts/LoggedOutLayout'
import { LabeledTextField } from 'app/core/components/forms/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/forms/Form'
import { ResetPassword } from 'app/auth/validations'
import resetPassword from 'app/auth/mutations/resetPassword'

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <div>
      <h1>Set a New Password</h1>

      {isSuccess ? (
        <div>
          <h2>Password Reset Successfully</h2>
          <p>
            Go to the <Link href={Routes.Home()}>homepage</Link>
          </p>
        </div>
      ) : (
        <Form
          submitText='Reset Password'
          schema={ResetPassword}
          initialValues={{ password: '', passwordConfirmation: '', token: query.token as string }}
          onSubmit={async (values) => {
            try {
              await resetPasswordMutation(values)
            } catch (error: any) {
              if (error.name === 'ResetPasswordError') {
                return {
                  [FORM_ERROR]: error.message
                }
              } else {
                return {
                  [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.'
                }
              }
            }
          }}
        >
          <LabeledTextField name='password' label='New Password' type='password' />
          <LabeledTextField
            name='passwordConfirmation'
            label='Confirm New Password'
            type='password'
          />
        </Form>
      )}
    </div>
  )
}

ResetPasswordPage.getLayout = (page) => (
  <LoggedOutLayout title='Reset Your Password'>{page}</LoggedOutLayout>
)

export default ResetPasswordPage
