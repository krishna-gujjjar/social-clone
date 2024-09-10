import type { Persistence } from 'firebase/auth';
import type { StateStorage } from 'zustand/middleware';

declare module 'firebase/auth' {
  export declare function getReactNativePersistence(storage: StateStorage): Persistence;
}
