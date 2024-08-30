import React, { useState } from "react";
import "./loginAdmin.css";
import axiosInstance from "../../axios";
import { useNavigate } from "react-router-dom";


export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axiosInstance
      .post("/users/login", { email, password })
      .then((res) => {
        const { admin, token } = res.data;
        if (admin) {
          sessionStorage.setItem("userToken", token);
          sessionStorage.setItem("admin", admin.toString());
          
          alert("You are successfully logged in as Admin");
          navigate('/admin/categories')
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third admin-login"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
        <div id="formFooter">Welcome To Admin Panel</div>
      </div>
    </div>
  );
}
