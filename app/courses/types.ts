export type PostComment = {
  id: number
  createdAt: Date
  content: string
  postId: number
  authorId: number
  author: {
    id: number
    name: string
    profilePicture: string | null
  }
  replies: PostCommentReply[]
}

export type PostCommentReply = {
  id: number
  createdAt: Date
  content: string
  commentId: number
  authorId: number
  author: {
    id: number
    name: string
    profilePicture: string | null
  }
}
