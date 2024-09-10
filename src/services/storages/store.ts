import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';

import { localStorage } from './mmkv';
import { createUserSlice } from './slices/user';
import type { StoreState } from './type';

const ZustandMMKVStorage: StateStorage = {
  setItem: (name: string, value: string) => {
    return localStorage.set(name, value);
  },
  getItem: (name: string) => {
    const value = localStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name: string) => {
    return localStorage.delete(name);
  },
};

const useStore = create<StoreState>()(
  persist((set, get) => createUserSlice(set, get), {
    name: 'store',
    storage: createJSONStorage(() => ZustandMMKVStorage),
  }),
);

export { useStore, ZustandMMKVStorage };
