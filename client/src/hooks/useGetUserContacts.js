import { useState } from 'react';
import axios from 'axios';
import { useChatStore } from '@/store';

export const useGetUserContacts = () => {
  const [loading, setLoading] = useState(false);
  const { setContacts } = useChatStore();

  const getUserContacts = async () => {
    try {
      setLoading(true);

      const contacts = await axios.get('/api/user/get-contacts', {
        withCredentials: true,
      });

      if (contacts.data.contact.length > 0) {
        setContacts(contacts.data.contact);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUserContacts };
};
