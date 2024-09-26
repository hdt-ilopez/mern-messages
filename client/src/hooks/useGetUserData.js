import { useAppStore } from '@/store';
import axios from 'axios';
import { useState } from 'react';
import { useLogoutUser } from './useLogoutUser';

export const useGetUserData = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useLogoutUser();
  const { setUserInfo } = useAppStore();
  const getUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/user/user-info', {
        withCredentials: true,
      });

      if (res.data) {
        setUserInfo(res.data);
      } else {
        logout();
      }
    } catch (error) {
      console.log(error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  return { getUserData, loading };
};
