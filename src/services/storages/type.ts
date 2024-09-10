import type { StoreApi } from 'zustand';
import type { User } from '../schema/auth';

export interface UserSlice {
  isLoggedIn: boolean;
  userData: User | null;
  setLoggedIn: (isLoggedIn: boolean) => void;
  setUserData: (userData: User | null) => void;
}

export type StoreState = UserSlice;

export type StoreSlice<T> = (
  set: StoreApi<StoreState>['setState'],
  get: StoreApi<StoreState>['getState'],
) => T;
