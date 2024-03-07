import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoForm from "../../ComponentsAfterLogin/InformationForm/InfoForm";
import "./LoginForm.css";
import { Spinner } from "@chakra-ui/react";
function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [loading,setLoading]=useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
    }, 1200); 
  };
  const handleButtonClicked = () => {
    const formData = { email, password };
  
    fetch(`http://localhost:8080/api/v1/registration/login?email=${email}&password=${password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {
        fetch(`http://localhost:8080/api/v1/registration/users/${response}/enabled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(enabledResponse => enabledResponse.json())
          .then(enabledResponse => {
            if (enabledResponse) {
              navigate("./MainApp");
              setUserId(response);
              props.onUserIdChange(response);
              console.log("User ID:", response);
            } else {
              console.log("User is not enabled");
            }
          })
          .catch(error => {
            console.error("Error checking user's enabled status:", error);
          });
      })
      .catch(error => {
        console.error("Error during login:", error);
      });
  
    startLoading();
  };
  
  const handleRegisterClick = () => {
    props.handleButtonClick(2);
  };

  
  return (
    <div className="LoginForm">
                {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            zIndex: 9999, 
          }}
        >
          <Spinner size="xl" color="blue.500" />
        </div>
      )}
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
