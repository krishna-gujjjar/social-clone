import type { IUser, StoreSlice, UserSlice } from '../type';

export const createUserSlice: StoreSlice<UserSlice> = set => ({
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn: isLoggedIn }),

  userData: null,
  setUserData: (userData: IUser | null) => set({ userData: userData }),

  resetUserData: () => set({ userData: null, isLoggedIn: false }),
});
