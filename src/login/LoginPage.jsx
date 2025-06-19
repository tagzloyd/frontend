import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../auth/AuthLayout';
import axios from 'axios';
import '../auth/AuthLayout.css';
import { Snackbar, Alert } from '@mui/material';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' // 'success', 'error', 'warning', 'info'
  });
  const navigate = useNavigate();

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      // Assuming the token is returned in the response
      const { token, user } = response.data;

      // Store token in localStorage or any preferred storage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Show success notification
      setNotification({
        open: true,
        message: 'Login successful! Redirecting...',
        severity: 'success'
      });

      // Redirect to the dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      let errorMessage = 'An error occurred';
      if (error.response) {
        errorMessage = error.response.data.message || 'Invalid credentials';
      } else if (error.request) {
        errorMessage = 'Network Error - Could not connect to server';
      }

      setError(errorMessage);
      setNotification({
        open: true,
        message: errorMessage,
        severity: 'error'
      });
    }
  };

  return (
    <AuthLayout title="Inventory Management System" subtitle="Sign in to your account">
      <form onSubmit={handleSubmit} className="mui-login-form">
        <div className="mui-input-container">
          <label htmlFor="email" className="mui-input-label">Email</label>
          <input
            type="email"
            id="email"
            className="mui-input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="mui-input-underline"></div>
        </div>

        <div className="mui-input-container">
          <label htmlFor="password" className="mui-input-label">Password</label>
          <div className="mui-password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mui-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="mui-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="mui-input-underline"></div>
        </div>

        {/* {error && <p className="mui-error-message">{error}</p>} */}

        <button type="submit" className="mui-login-button">
          Sign In
        </button>
      </form>

      {/* MUI Notification */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </AuthLayout>
  );
};

export default LoginPage;