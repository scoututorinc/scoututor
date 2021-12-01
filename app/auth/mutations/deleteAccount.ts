import { Ctx, NotFoundError } from 'blitz'
import db from 'db'

export default async function deleteAccount(_: any, ctx: Ctx) {
  const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
  if (!user) throw new NotFoundError()

  return await db.user.delete({
    where: { id: user.id }
  })
}
