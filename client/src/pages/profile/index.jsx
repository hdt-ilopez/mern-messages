import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store';
import { ChevronLeft } from 'lucide-react';
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGetUserData } from '@/hooks/useGetUserData';

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const { getUserData } = useGetUserData();
  const navigate = useNavigate();
  const [userName, setUserName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);

  useEffect(() => {
    if (!userInfo) {
      getUserData();
    }
    setUserName(userInfo?.userName);
    setFirstName(userInfo?.firstName);
    setLastName(userInfo?.lastName);
  }, []);

  const avatar = createAvatar(bottts, {
    seed: userName || 'default',
  });

  const svg = avatar.toDataUri();

  const handleUpdateProfile = async () => {
    // Check if required fields are filled
    if (!userName || !firstName || !lastName) {
      toast.error('Username, first, and last name are required');
      return;
    }

    try {
      // Make the API request to update the profile
      const res = await axios.post(
        '/api/auth/update-profile',
        {
          userName,
          firstName,
          lastName,
          profilePicture: svg,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data) {
        setUserInfo(res.data);
        toast.success('Profile successfully updated');
        navigate('/chat');
      }
    } catch (error) {
      toast.error(error.response.data);
      console.error('Update Profile Error:', error);
    }
  };

  return (
    <div className="bg-[#222] h-screen w-screen flex justify-center items-center">
      <div className=" max-w-screen-sm ">
        <Button
          onClick={() => navigate(-1)}
          className={`${
            !userInfo?.profileSetup && 'hidden'
          } text-white hover:text-white/80 mb-5 bg-transparent hover:bg-transparent `}
          size="icon"
        >
          <ChevronLeft />
        </Button>
        <div className="grid grid-cols-2 text-white mb-5">
          <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
            <AvatarImage src={svg} />
            <AvatarFallback className="text-red-500 text-5xl bg-red-300 border-red-500 border-4">
              CN
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none focus-visible:ring-white"
            />
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none focus-visible:ring-white"
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-lg p-6 bg-[#2c2e3b] border-none focus-visible:ring-white"
            />
          </div>
        </div>
        <Button
          onClick={handleUpdateProfile}
          className="h-16 w-full bg-purple-700 hover:bg-purple-500 transition-all duration-300 ease-in-out"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Profile;
