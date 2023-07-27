import './Login.css';
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate} from 'react-router-dom';

function Login() 
{
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function connect() 
  {
    fetch("http://localhost/TechDrupalers/web/session/token")
      .then((response) => response.text())
      .then((csrfToken) => {
        console.log(csrfToken);
        userLogin(csrfToken);
      })
      .catch((error) => console.error(error));
  }

  function userLogin(csrfToken) 
  {
    fetch("http://localhost/TechDrupalers/web/user/login?_format=json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: username,
        pass: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => 
      {
        if (data.current_user === undefined) 
        {
          throw new Error("Invalid username or password");
        }
        console.log(data); // Check the value of data
        console.log(data.token);
        localStorage.setItem("loginToken", data.token); // Store the login token in localStorage
        localStorage.setItem("userProfile", JSON.stringify(data.current_user)); // Store the user profile details in localStorage
        localStorage.setItem("Username",username);
        localStorage.setItem("Password",password);
        alert("Welcome " + data.current_user.roles[1]);
        if (data.current_user.roles[1] === 'administrator') {
          navigate('/admindashboard');
        } else if (data.current_user.roles[1] === 'vendor') {
          navigate('/vendordashboard');
        } else if (data.current_user.roles[1] === 'customer') {
          navigate('/buyersdashboard');
        } else {
          alert("Check login");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.message);
      });
  }

  return (
    <div className="main-login">
      <div className="sub-main-login">
        <div className="form-login">
          <h1>Login</h1>
          <div>
            <label>Username</label>
          </div>
          <div className="login-input-text">
            <input type="text" className="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
          </div>
          <div>
            <label>Password</label>
          </div>
          <div className="login-input-password">
            <input type="password" className="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
          </div>
          <button onClick={connect}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
