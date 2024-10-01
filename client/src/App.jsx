import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Chat from './pages/chat';
import Profile from './pages/profile';
import { ToastContainer } from 'react-toastify';
import { useAppStore } from './store';

const App = () => {
  const { userInfo } = useAppStore();

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
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
};

export default App;
