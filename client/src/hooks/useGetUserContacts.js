import { useState } from 'react';
import axios from 'axios';
import { useChatStore } from '@/store';

export const useGetUserContacts = () => {
  const [loading, setLoading] = useState(false);
  const { setContacts, contacts } = useChatStore();

  const getUserContacts = async () => {
    try {
      setLoading(true);

      const res = await axios.get('/api/user/get-contacts', {
        withCredentials: true,
      });

      if (res.data) {
        setContacts(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getUserContacts };
};
