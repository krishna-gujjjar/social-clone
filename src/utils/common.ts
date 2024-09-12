import { Timestamp } from 'firebase/firestore';

import type { User } from '@/services/schema/auth';
import { useStore } from '@/services/storages';

const now = Timestamp.fromDate(new Date());

const updateLocalUserData = (user: User) => {
  useStore.getState().setUserData(user);

  return user;
};

export { now, updateLocalUserData };
