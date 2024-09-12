import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import type { z } from 'zod';

import { now } from '@/utils/common';
import { userSchema } from '../schema/auth';
import type { authSchema } from '../schema/auth';
import { db } from './firebase';

const createUser = async (uid: string, user: z.infer<typeof authSchema>) => {
  const parsedData = userSchema.safeParse({
    userId: uid,
    email: user.email,
    bio: user.bio ?? null,
    followers: user.followers ?? [],
    following: user.following ?? [],
    posts: user.posts ?? [],
    profileImage: user.profileImage ?? null,
    name: user.name ?? { first: null, last: null },
    createdAt: now,
    updatedAt: now,
  });

  return await setDoc(doc(db, 'users', uid), parsedData.data);
};

const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, 'users', uid));
  return userSchema.safeParse(user.data())?.data;
};

const updateUser = async (uid: string, user: Partial<z.infer<typeof userSchema>>) => {
  return await updateDoc(doc(db, 'users', uid), { ...user, updatedAt: now });
};

export { createUser, getUser, updateUser };
