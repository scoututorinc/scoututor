import { hash256, Ctx, SecurePassword } from 'blitz'
import forgotPassword from './forgotPassword'
import db from 'db'
import previewEmail from 'preview-email'

beforeEach(async () => {
  await db.$reset()
})

const generatedToken = 'plain-token'
jest.mock('blitz', () => ({
  ...jest.requireActual<Record<string, unknown>>('blitz')!,
  generateToken: () => generatedToken
}))
jest.mock('preview-email', () => jest.fn())

describe('forgotPassword mutation', () => {
  it("does not throw error if user doesn't exist", async () => {
    await expect(forgotPassword({ email: 'no-user@email.com' }, {} as Ctx)).resolves.not.toThrow()
  })

  it('works correctly', async () => {
    // Create test user
    await db.user.deleteMany({ where: { email: 'user@example.com' } })
    const user = await db.user.create({
      data: {
        email: 'user@example.com',
        name: 'Jose Antunes',
        district: 'Braga',
        municipality: 'Amares',
        hashedPassword: await SecurePassword.hash('XKCD123'),
        profilePicture: 'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
        tokens: {
          // Create old token to ensure it's deleted
          create: {
            type: 'RESET_PASSWORD',
            hashedToken: 'token',
            expiresAt: new Date(),
            sentTo: 'user@example.com'
          }
        }
      },
      include: { tokens: true }
    })

    // Invoke the mutation
    await forgotPassword({ email: user.email }, {} as Ctx)

    const tokens = await db.token.findMany({ where: { userId: user.id } })
    const token = tokens[0]
    if (!user.tokens[0]) throw new Error('Missing user token')
    if (!token) throw new Error('Missing token')

    // delete's existing tokens
    expect(tokens.length).toBe(1)

    expect(token.id).not.toBe(user.tokens[0].id)
    expect(token.type).toBe('RESET_PASSWORD')
    expect(token.sentTo).toBe(user.email)
    expect(token.hashedToken).toBe(hash256(generatedToken))
    expect(token.expiresAt > new Date()).toBe(true)
    expect(previewEmail).toBeCalled()
  })
})
