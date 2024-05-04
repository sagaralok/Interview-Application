import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../style/Authentication.css";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleLogin = (e:any) => {
    e.preventDefault();

    if(email.length==0 || password.length==0){
      alert('Enter email and password');
      return;
    }
    
    if (password.length < 6 || password.length > 20) {
      alert('Password must be between 6 and 20 characters long');
      setPassword('');
      return;
    }
    AuthService.login(email, password).then(() => {
      navigate('/candidates');
    });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="********"
              id="password"
              name="password"
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        <button className="register-btn" onClick={() => navigate('/signup')}>
          Create new account
        </button>
      </div>
    </div>
  );
};

export default Login;
