import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthLayout from '../auth/AuthLayout';
import '../auth/AuthLayout.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);

      // Optionally, you can show a success message here

      // Redirect to login on successful registration
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({
          general: error.response?.data?.message || 'Registration failed. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create an account" subtitle="Join us today">
      {errors.general && (
        <div className="mui-error-message">
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mui-login-form">
        <div className="mui-name-fields">
          <div className="mui-input-container mui-half-width">
            <label htmlFor="first_name" className="mui-input-label">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className={`mui-input-field ${errors.first_name ? 'mui-input-error' : ''}`}
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <div className="mui-input-underline"></div>
            {errors.first_name && (
              <span className="mui-error-text">{errors.first_name[0]}</span>
            )}
          </div>

          <div className="mui-input-container mui-half-width">
            <label htmlFor="last_name" className="mui-input-label">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className={`mui-input-field ${errors.last_name ? 'mui-input-error' : ''}`}
              value={formData.last_name}
              onChange={handleChange}
              required
            />
            <div className="mui-input-underline"></div>
            {errors.last_name && (
              <span className="mui-error-text">{errors.last_name[0]}</span>
            )}
          </div>
        </div>

        <div className="mui-input-container">
          <label htmlFor="email" className="mui-input-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`mui-input-field ${errors.email ? 'mui-input-error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="mui-input-underline"></div>
          {errors.email && (
            <span className="mui-error-text">{errors.email[0]}</span>
          )}
        </div>

        <div className="mui-input-container">
          <label htmlFor="password" className="mui-input-label">Password</label>
          <div className="mui-password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className={`mui-input-field ${errors.password ? 'mui-input-error' : ''}`}
              value={formData.password}
              onChange={handleChange}
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
          {errors.password && (
            <span className="mui-error-text">{errors.password[0]}</span>
          )}
          <p className="mui-hint-text">Use 8 or more characters with a mix of letters, numbers & symbols</p>
        </div>

        <div className="mui-input-container">
          <label htmlFor="password_confirmation" className="mui-input-label">Confirm Password</label>
          <div className="mui-password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="password_confirmation"
              name="password_confirmation"
              className="mui-input-field"
              value={formData.password_confirmation}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="mui-password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="mui-input-underline"></div>
        </div>
        <button 
          type="submit" 
          className="mui-login-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="mui-spinner"></span> Signing Up...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </AuthLayout>
  );
};

export default SignUpPage;