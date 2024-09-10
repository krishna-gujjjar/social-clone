import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email(),
  name: z
    .object({
      first: z.string().min(3).nullish(),
      last: z.string().min(3).nullish(),
    })
    .optional(),
  bio: z.string().nullish(),
  profileImage: z.string().nullish(),
  followers: z.array(z.string()).optional(),
  following: z.array(z.string()).optional(),
});

const userSchema = z.object({
  ...authSchema.shape,
  userId: z.string(),
  name: z.object({
    first: z.string().min(3).nullable(),
    last: z.string().min(3).nullable(),
  }),
  bio: z.string().nullable(),
  profileImage: z.string().nullable(),
  followers: z.array(z.string()),
  following: z.array(z.string()),
  createdAt: z.instanceof(Timestamp),
  updatedAt: z.instanceof(Timestamp),
});

type User = z.infer<typeof userSchema>;

export { authSchema, userSchema };
export type { User };
