import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './login/LoginPage.jsx';
import SignUpPage from './signup/SignUpPage.jsx';
import AuthLayout from './auth/AuthLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import PublicRoute from './routes/PublicRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <AuthLayout title="Welcome" subtitle="Choose an option">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="/login" className="mui-login-button" style={{ textAlign: 'center', textDecoration: 'none' }}>
              Login
            </a>
            <a href="/signup" className="mui-login-button" style={{ 
              textAlign: 'center', 
              textDecoration: 'none',
              backgroundColor: 'transparent',
              color: '#1976d2',
              boxShadow: 'none',
              border: '1px solid #1976d2'
            }}>
              Sign Up
            </a>
          </div>
        </AuthLayout>
      </PublicRoute>
    )
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    )
  },
  {
    path: '/signup',
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    )
  },
  {
    path: '/*',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);