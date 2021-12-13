import { resolver } from 'blitz'
import db from 'db'
import { CreatePostCommentInput } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreatePostCommentInput),
  async ({ postId, content }, ctx) => {
    const comment = await db.comment.create({
      data: {
        postId,
        authorId: ctx.session.$publicData.userId,
        content
      },
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
          }
        }
      }
    })

    await db.post.update({
      where: { id: postId },
      data: {
        comments: {
          connect: { id: comment.id }
        }
      }
    })

    return comment
  }
)
