import Background from '@/assets/login2.png';
import Victory from '@/assets/victory.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/store';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUserInfo } = useAppStore();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Email and password required to login');
      return;
    }

    try {
      const res = await axios.post(
        '/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      if (res.data) {
        console.log(res.data);
        setUserInfo(res.data);
        toast.success('Login Successful');
      }
    } catch (error) {
      toast.error(error.response.data);
      console.log(error);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error(
        'Email, password, and confirmation password are required to sign up'
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(
        '/api/auth/signup',
        { email, password },
        { withCredentials: true }
      );

      console.log(res);

      if (res.data) {
        setUserInfo(res.data);
        toast.success('Signup successful');
      }
    } catch (error) {
      toast.error(error.response.data);
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw]  lg:w-[70vw]  xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
        <div className="flex items-center flex-col justify-center">
          <div className="flex items-center justify-center flex-center flex-col">
            {' '}
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="font-medium text-center">
              Fill in the details to get started with the best chat app!
            </p>
          </div>
          <div className="flex justify-center w-full mt-5">
            <Tabs defaultValue="login" className="w-full p-2">
              <TabsList className="bg-transparent rounded-none w-full">
                <TabsTrigger
                  value="login"
                  className="bg-gray-50 data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 text-black text-opacity-90 border-b-2 rounded-none w-full "
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="bg-gray-50  data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300 text-black text-opacity-90 border-b-2 rounded-none w-full shadow-none "
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5 mt-10" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="rounded-full p-6">
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  className="rounded-full p-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button onClick={handleSignup} className="rounded-full p-6">
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden xl:flex justify-center items-center">
          <img
            src={Background}
            alt="Background Login image"
            className="h-[700px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
