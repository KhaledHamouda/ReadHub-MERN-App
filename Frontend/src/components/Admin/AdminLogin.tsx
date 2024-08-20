import React, { useState } from 'react';
import './loginAdmin.css';
import axios from '../../axios';

interface AdminLoginProps {
  onLoginSuccess: (admin: boolean, token: string) => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('/users/login', { email, password })
      .then((res) => {
        const { admin, token } = res.data;
        if (admin) {
          sessionStorage.setItem('userToken', token);
          sessionStorage.setItem('admin', admin.toString());
          onLoginSuccess(admin, token);
          alert("You are successfully logged in as Admin");
        } else {
          alert("Access denied: You are not an admin.");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Sorry, you have entered incorrect Email or Password");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="active admin-login-h2"> Sign In </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="email"
            className="fadeIn second admin-login"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third admin-login"
            name="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
        <div id="formFooter">
          Welcome To Admin Panel
        </div>
      </div>
    </div>
  );
}
