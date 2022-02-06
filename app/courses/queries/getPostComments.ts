import { resolver } from 'blitz'
import db from 'db'
import { z } from 'zod'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id) => {
    return (
      await db.post.findUnique({
        where: { id },
        select: {
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  profilePicture: true
                }
              },
              replies: {
                include: {
                  author: {
                    select: {
                      id: true,
                      name: true,
                      profilePicture: true
                    }
                  }
                },
                orderBy: { createdAt: 'desc' }
              }
            },
            orderBy: { createdAt: 'desc' }
          }
        }
      })
    )?.comments
  }
)
