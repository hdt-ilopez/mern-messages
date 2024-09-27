export const selectedChat = (set) => ({
  selectedChat: undefined,
  setSelectedChat: (selectedChat) => set({ selectedChat }),
});
export const messages = (set) => ({
  messages: [],
  setMessages: (messages) => set({ messages }),
});
export const conversations = (set) => ({
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
});
export const contacts = (set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
});
export const newChat = (set) => ({
  newChat: false,
  setNewChat: (newChat) => set({ newChat }),
});
export const selectedContact = (set) => ({
  selectedContact: undefined,
  setSelectedContact: (selectedContact) => set({ selectedContact }),
});
