import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  const handleButtonClicked = () => {
    const formData = { email, password };

    fetch('http://localhost:8080/api/v1/registration/login?email=' + email + '&password=' + password, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {if(response){
        navigate("./MainApp");
    }}
     
      );
  };

  const handleRegisterClick = () => {
    props.handleButtonClick(2);
  };

  return (
    <div className="LoginForm">
      <form>
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <i className='bx bxs-envelope'></i>
        </div>
        <div className="input-box">
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <i className='bx bxs-lock-alt'></i>
        </div>
        <div className="remember-forget">
   
        </div>
        <button type="button" className="btn" onClick={handleButtonClicked}>Login</button>
        <div className="register">
          <p>Don't have an account? <button className="registerButton" onClick={handleRegisterClick}>Register</button></p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
