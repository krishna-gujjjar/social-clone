import { useCallback } from 'react';
import type { z } from 'zod';

import { loginAction, logoutAction, registerAction } from '@/services/firebase/auth';
import { getUser, updateUser } from '@/services/firebase/user';
import type { userSchema } from '@/services/schema/auth';
import { useStore } from '@/services/storages';

export const useAuth = () => {
  const isLoggedIn = useStore(state => state.isLoggedIn);
  const setLoggedIn = useStore(state => state.setLoggedIn);
  const setUserData = useStore(state => state.setUserData);

  const fetchUserData = useCallback(
    async (uid: string) => {
      const userData = await getUser(uid);

      if (userData?.userId) {
        setUserData(userData);
      }

      return userData;
    },
    [setUserData],
  );

  const register = useCallback(
    async (email: string, password: string, firstName?: string, lastName?: string) => {
      const result = await registerAction(email, password, firstName, lastName);
      if (typeof result?.user?.uid === 'string') {
        setLoggedIn(true);

        return await fetchUserData(result.user.uid);
      }

      return null;
    },
    [fetchUserData, setLoggedIn],
  );

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginAction(email, password);
      if (typeof result?.user?.uid === 'string') {
        setLoggedIn(true);

        return await fetchUserData(result.user.uid);
      }

      return null;
    },
    [fetchUserData, setLoggedIn],
  );

  const updateSelf = useCallback(
    async (data: Partial<z.infer<typeof userSchema>>) => {
      if (typeof user?.userId === 'string') {
        await updateUser(user?.userId, data);

        return await fetchUserData(user.userId);
      }

      return null;
    },
    [fetchUserData, user?.userId],
  );

  const logout = useCallback(async () => {
    await logoutAction();
    setLoggedIn(false);
    setUserData(null);
  }, [setLoggedIn, setUserData]);

  return { isLoggedIn, login, logout, register, updateSelf };
};
