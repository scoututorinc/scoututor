import { passportAuth, VerifyCallbackResult } from 'blitz'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from 'db'

export default passportAuth({
  successRedirectUrl: '/main_feed',
  errorRedirectUrl: '/auth/google/error',
  strategies: [
    {
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET!,
          callbackURL: 'http://localhost:3000/api/auth/google/callback',
          // includeEmail: true,
          scope: ['email', 'profile']
        },
        async function (accessToken, refreshToken, params, profile, done) {
          const email = profile.emails && profile.emails[0].value

          const user = await db.user.upsert({
            where: { email },
            create: {
              name: profile.displayName,
              district: 'Amares',
              municipality: 'Amares',
              email: email,
              profilePicture: profile._json.picture
            },
            update: { email }
          })

          const publicData = {
            userId: user.id,
            role: user.role
          }

          done(undefined, { publicData })
        }
      )
    }
  ]
})
