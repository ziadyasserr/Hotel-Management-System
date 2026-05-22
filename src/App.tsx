import { lazy, Suspense, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Toaster } from 'sonner';
import './App.css';

import { useAppDispatch } from './store/hooks';
import { setCredentials } from './store/slices/authSlice';

// ================= LAYOUTS =================
const AuthLayout = lazy(() => import('./shared/AuthLayout/AuthLayout'));

const MasterAdminLayout = lazy(
  () => import('./shared/MasterAdminLayout/MasterAdminLayout'),
);

const MasterUserLayout = lazy(
  () => import('./shared/MasterUserLayout/MasterUserLayout'),
);

const ProtectedRoute = lazy(
  () => import('./shared/components/ProtectedRoute/ProtectedRoute'),
);

// ================= USER PAGES =================
const Home = lazy(() => import('./features/user/components/Home/Home'));

const ExploreRoom = lazy(
  () => import('./features/user/components/ExploreRoom/ExploreRoom'),
);

const FavoriteRoom = lazy(
  () => import('./features/user/components/FavoriteRoom/FavoriteRoom'),
);

const RoomDetails = lazy(
  () => import('./features/user/components/RoomDetails/RoomDetails'),
);

// ================= AUTH PAGES =================
const Login = lazy(
  () => import('./features/authentication/components/Login/Login'),
);

const Register = lazy(
  () => import('./features/authentication/components/Register/Register'),
);

const ForgotPassword = lazy(
  () =>
    import('./features/authentication/components/ForgotPassword/ForgotPassword'),
);

const ResetPassword = lazy(
  () =>
    import('./features/authentication/components/ResetPassword/ResetPassword'),
);

const ChangePassword = lazy(
  () =>
    import('./features/authentication/components/ChangePassword/ChangePassword'),
);

// ================= ADMIN PAGES =================
const Dashboard = lazy(
  () => import('./features/admin/components/Dashboard/Dashboard'),
);

const UsersList = lazy(
  () => import('./features/admin/components/UsersList/UsersList'),
);

const BookingList = lazy(
  () => import('./features/admin/components/BookingList/BookingList'),
);

const AdsList = lazy(() => import('./features/admin/components/Ads/AdsList'));

const RoomFacilitiesList = lazy(
  () => import('./features/admin/components/RoomFacilities/RoomFacilitiesList'),
);

const RoomsList = lazy(
  () => import('./features/admin/components/Rooms/RoomsList'),
);

// ================= ROUTER =================
const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgotPassword', element: <ForgotPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'changePassword', element: <ChangePassword /> },
    ],
  },

  {
    path: 'dashboard',
    element: (
      <ProtectedRoute>
        <MasterAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'home', element: <Dashboard /> },
      { path: 'users', element: <UsersList /> },
      { path: 'bookings', element: <BookingList /> },
      { path: 'ads', element: <AdsList /> },
      { path: 'room-facilities', element: <RoomFacilitiesList /> },
      { path: 'rooms', element: <RoomsList /> },
    ],
  },

  {
    path: '/',
    element: <MasterUserLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explore', element: <ExploreRoom /> },
      { path: 'favorites', element: <FavoriteRoom /> },
      { path: 'room-details/:id', element: <RoomDetails /> },
    ],
  },
]);

// ================= APP =================
function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      dispatch(setCredentials({ token }));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        expand
        theme="light"
        duration={3000}
      />

      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center text-2xl font-bold">
            Loading...
          </div>
        }
      >
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
