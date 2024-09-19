import { useAppStore } from '@/store';
import axios from 'axios';

export const useLogoutUser = () => {
  const { setUserInfo } = useAppStore();

  const logout = async () => {
    await axios.post('/api/auth/logout', { withCredentials: true });
    setUserInfo(null);
  };
  return { logout };
};
