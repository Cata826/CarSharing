import React from "react"
import { useNavigate } from "react-router-dom";
import "./NavBar.css"

function NavBar(props){

  let navigate = useNavigate();

  const handleHomeClick = () => {
      navigate("/");
      props.handleButtonClick(0);
  };
    
  const handleLogInClick = () => {
      navigate("/");
      props.handleButtonClick(1);
  };
    
  const handleRegisterClick = () => {
      navigate("/");
      props.handleButtonClick(2);
  };

  return(
      <div className="NavBar">
          <div id="NameButton">
              <button onClick={handleHomeClick}>RideSharingApp</button>
          </div>
          <div id="LoginRegister">
              <button onClick={handleLogInClick}>Log In</button>
              <button onClick={handleRegisterClick}>Register</button>
          </div>
      </div>
  );
}

export default NavBar;