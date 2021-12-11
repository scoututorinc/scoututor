import db, { Prisma } from 'db'
import { GuardBuilder } from '@blitz-guard/core'
import { AuthenticatedMiddlewareCtx } from 'blitz'

type ExtendedResourceTypes = Prisma.ModelName

type ExtendedAbilityTypes = 'join'

const Guard = GuardBuilder<ExtendedResourceTypes, ExtendedAbilityTypes>(
  async (ctx, { can, cannot }) => {
    cannot('manage', 'all').reason('You did something wrong!')

    if (ctx.session.$isAuthorized()) {
      const authCtx = ctx as AuthenticatedMiddlewareCtx

      can('update', 'Course', async (args) => {
        return (
          (await db.course.count({
            where: { id: args.id, authorId: authCtx.session.userId }
          })) === 1
        )
      })

      can('join', 'Course', async (args: { id: number }) => {
        return (
          (await db.courseMembership.count({
            where: { courseId: args.id, userId: authCtx.session.userId }
          })) === 0 &&
          (await db.course.count({
            where: { id: args.id, authorId: authCtx.session.userId }
          })) === 0
        )
      })
    }
  }
)

export default Guard
