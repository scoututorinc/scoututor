import { resolver } from 'blitz'
import db from 'db'

export default resolver.pipe(resolver.authorize(), async ({}, ctx) => {
  return await db.course.findMany({})
})
