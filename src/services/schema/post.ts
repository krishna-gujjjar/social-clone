import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const postSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  caption: z.string(),
  isReel: z.boolean(),
  imageUrl: z.string(),
  videoUrl: z.string(),
  likes: z.array(z.string()),
  comments: z.array(z.string()),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

type Post = z.infer<typeof postSchema>;

export { postSchema };
export type { Post };
