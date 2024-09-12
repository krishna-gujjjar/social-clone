import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const commentSchema = z.object({
  commentId: z.string(),
  postId: z.string(),
  userId: z.string(),
  text: z.string(),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

const likeSchema = z.object({
  likeId: z.string(),
  postId: z.string(),
  userId: z.string(),
  createdAt: z.instanceof(Timestamp),
});

type Comment = z.infer<typeof commentSchema>;
type Like = z.infer<typeof likeSchema>;

export { commentSchema, likeSchema };
export type { Comment, Like };
