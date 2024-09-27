import { create } from 'zustand';
import { createAuthSlice } from './slices/auth-slice';
import { persist } from 'zustand/middleware';
import {
  contacts,
  conversations,
  messages,
  newChat,
  selectedChat,
  selectedContact,
} from './slices/chat-slice';

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

export const useChatStore = create((set, get) => ({
  ...conversations(set, get),
  ...selectedChat(set, get),
  ...messages(set, get),
  ...contacts(set, get),
  ...selectedContact(set, get),
  ...newChat(set, get),
}));
