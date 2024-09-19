import { create } from 'zustand';
import { createAuthSlice } from './slices/auth-slice';
import { persist } from 'zustand/middleware';

// Create the store with the persist middleware
export const useAppStore = create(
  persist(
    (set, get) => ({
      ...createAuthSlice(set, get),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage,
    }
  )
);
