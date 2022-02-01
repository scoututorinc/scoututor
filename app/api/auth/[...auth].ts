import { passportAuth, VerifyCallbackResult, resolver, SecurePassword } from 'blitz'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import db from 'db'

import axios from 'axios'
import { Signup, ChatSignUp } from 'app/auth/validations'
import { Role } from 'types'
import { z } from 'zod'

const chat_private_key = process.env.CHAT_ENGINE_PRIVATE_KEY
axios.defaults.headers.common['PRIVATE-KEY'] = chat_private_key!

const createChatUser = async ({
  username,
  first_name,
  last_name,
  secret
}: z.infer<typeof ChatSignUp>) => {
  try {
    const response = await axios.post('https://api.chatengine.io/users/', {
      username: username,
      first_name: first_name,
      last_name: last_name,
      secret: secret
    })
    if (response.status != 201) {
      throw { statusCode: response.status, data: response.data }
    }
  } catch (error) {
    // TODO: there must be a better error handling mechanism
    console.log('Error creating chat user:', error)
  }
}

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

          const chatEngineData = {
            username: profile.name?.givenName?.trim() + ' ' + profile.name?.familyName?.trim(),
            first_name: profile.name?.givenName?.trim(),
            last_name: profile.name?.familyName?.trim(),
            secret: email.trim()
          }

          await createChatUser(chatEngineData)

          done(undefined, { publicData })
        }
      )
    }
  ]
})
