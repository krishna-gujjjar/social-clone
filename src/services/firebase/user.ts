import { Timestamp, doc, getDoc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';
import type { z } from 'zod';

import { userSchema } from '../schema/auth';
import type { authSchema } from '../schema/auth';
import { db } from './firebase';

const createUser = async (uid: string, user: z.infer<typeof authSchema>) => {
  const now = Timestamp.fromDate(new Date());

  const parsedData = userSchema.safeParse({
    userId: uid,
    email: user.email,
    bio: user.bio ?? null,
    followers: user.followers ?? [],
    following: user.following ?? [],
    profileImage: user.profileImage ?? null,
    name: user.name ?? { first: null, last: null },
    createdAt: now,
    updatedAt: now,
  });

  try {
    return await setDoc(doc(db, 'users', uid), parsedData.data);
  } catch (error) {
    // @ts-ignore
    Alert.alert('Error in creating user', JSON.stringify(error?.message));
  }
};

const getUser = async (uid: string) => {
  const user = await getDoc(doc(db, 'users', uid));
  return userSchema.safeParse(user.data())?.data;
};

export { createUser, getUser };
