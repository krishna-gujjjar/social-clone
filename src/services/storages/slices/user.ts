import type { StoreSlice, UserSlice } from '../type';

export const createUserSlice: StoreSlice<UserSlice> = set => ({
  isLoggedIn: false,
  setLoggedIn: isLoggedIn => set({ isLoggedIn: isLoggedIn }),

  userData: null,
  setUserData: userData => set({ userData: userData }),

  resetUserData: () => set({ userData: null, isLoggedIn: false }),
});
