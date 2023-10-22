import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const AuthenticationPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  debugger;

  const handleLogin = (loginValue) => {
    setIsLogin(loginValue);
  }

  return (
    <div>
      <h1>User Authentication</h1>
      {isLogin ?
        <Login sendLoginInfo />
        :
        <Register sendLoginInfo />
      }
      <p>
        {isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
        <Link onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register here' : 'Login here'}</Link>
      </p>
    </div>
  );
};

export default AuthenticationPage;
