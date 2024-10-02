import axios from 'axios';
import { useState } from 'react';
import { useLogoutUser } from './useLogoutUser';

export const useCheckAuthToken = () => {
  const [loading, setLoading] = useState(false);
  const { logout } = useLogoutUser();

  const checkAuthToken = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        '/api/auth/verify-token',
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 403 || res.status === 401) {
        logout();
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 403 || error.response.status === 401)
      ) {
        logout();
      } else {
        console.error('An unexpected error occurred:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { checkAuthToken, loading };
};
