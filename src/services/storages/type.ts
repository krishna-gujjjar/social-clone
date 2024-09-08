import type { StoreApi } from 'zustand';

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface UserSlice {
  isLoggedIn: boolean;
  userData: IUser | null;
  resetUserData: () => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setUserData: (userData: IUser | null) => void;
}

export type StoreState = UserSlice;

export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
) => T;
