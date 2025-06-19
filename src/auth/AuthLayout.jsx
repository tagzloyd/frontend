import React from 'react';
import { Link } from 'react-router-dom';
import './AuthLayout.css';
import { Box } from '@mui/material';

const backgroundUrl = '/images/background.jpg';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <Box
      className="mui-login-container"
      sx={{
        minHeight: '90vh',
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="mui-login-card">
        <div className="mui-login-header">
          <h2 className="mui-login-title">{title}</h2>
          <p className="mui-login-subtitle">{subtitle}</p>
        </div>

        {children}

        {/* <div className="mui-login-footer">
          <p className="mui-footer-text">
            {title === 'Welcome back' ? (
              <>Don't have an account? <Link to="/signup" className="mui-link">Sign up</Link></>
            ) : (
              <>Already have an account? <Link to="/login" className="mui-link">Sign in</Link></>
            )}
          </p>
        </div> */}
      </div>
    </Box>
  );
};

export default AuthLayout;