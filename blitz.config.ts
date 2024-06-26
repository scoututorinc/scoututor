import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from 'blitz'
import { BlitzGuardMiddleware } from '@blitz-guard/core/dist/middleware'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid'
])

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: 'scoututor',
      isAuthorized: simpleRolesIsAuthorized
    }),
    //Todo: Remove any when fix is released
    BlitzGuardMiddleware({
      excluded: []
    }) as any
  ]
  /* Uncomment this to customize the webpack config
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    return config
  },
  */
}
module.exports = withBundleAnalyzer(withTM(config))
