import { resolver, NotFoundError } from 'blitz'
import db from 'db'
import { z } from 'zod'

const SEVEN_DAYS_IN_MILLIS = 604_800_000

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(z.number().int().min(0)),
  async (id) => {
    return await db.course.findUnique({
      where: { id },
      include: {
        author: { select: { name: true, profilePicture: true } },
        reviews: {
          select: {
            createdAt: true,
            rating: true,
            content: true,
            courseId: true,
            course: true,
            authorId: true,
            author: {
              select: { name: true, profilePicture: true, district: true, municipality: true }
            }
          }
        },
        discipline: true,
        knowledgeAreas: true,
        posts: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            updatedAt: true,
            description: true,
            files: true,
            courseId: true,
            author: {
              select: {
                id: true,
                name: true,
                profilePicture: true
              }
            },
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
          },
          where: {
            createdAt: {
              gte: new Date(Date.now() - SEVEN_DAYS_IN_MILLIS)
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })
  }
)
