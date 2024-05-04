import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import "../style/Authentication.css";

export const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
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
    AuthService.register(name, email, password).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Sign Up</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Please enter your name"
              id="name"
              name="name"
            />
          </div>
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
              placeholder="Enter a strong password"
              id="password"
              name="password"
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <button className="register-btn" onClick={() => navigate('/')}>
          Already have an account? Log in here.
        </button>
      </div>
    </div>
  );
};

export default SignUp;
