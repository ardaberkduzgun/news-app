import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login'; // Import Login component
import Register from './Register'; // Import Register component

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Use state to toggle between login and register forms

  return (
    <div>
      <h1>User Authentication</h1>
      {isLogin ? (
        <Login />
      ) : (
        <Register />
      )}
      <p>
        {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
        <Link onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register here' : 'Login here'}</Link>
      </p>
    </div>
  );
};

export default AuthenticationPage;
