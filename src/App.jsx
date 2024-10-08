import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppStore } from './store';
import useListenMessages from './hooks/useListenMessages';
import { useCheckAuthToken } from './hooks/useCheckAuthToken';
import { useEffect } from 'react';

const App = () => {
  const { userInfo } = useAppStore();
  const { checkAuthToken } = useCheckAuthToken();
  useListenMessages();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={!userInfo ? <Auth /> : <Navigate to={'/'} />}
        />
        <Route
          path="/"
          element={
            userInfo ? (
              userInfo?.profileSetup ? (
                <Chat />
              ) : (
                <Navigate to={'/profile'} />
              )
            ) : (
              <Navigate to={'/auth'} />
            )
          }
        />
        <Route
          path="/profile"
          element={userInfo ? <Profile /> : <Navigate to={'/auth'} />}
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
