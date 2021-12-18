import { resolver } from 'blitz'
import db from 'db'
import { CreatePostCommentReplyInput } from 'app/courses/validations'

export default resolver.pipe(
  resolver.authorize(),
  resolver.zod(CreatePostCommentReplyInput),
  async ({ commentId, content }, ctx) => {
    const reply = await db.reply.create({
      data: {
        commentId,
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
        }
      }
    })

    await db.comment.update({
      where: { id: commentId },
      data: {
        replies: {
          connect: { id: reply.id }
        }
      }
    })

    return reply
  }
)
