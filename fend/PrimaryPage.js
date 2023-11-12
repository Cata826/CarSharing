import React from "react";
import {useState} from "react";
import NavBar from "./components/NavBar/NavBar";
import Description from "./components/Descriptions/Description";
import Footer from "./components/Footer/Footer";
import LoginForm from "./components/RegisterLoginForms/LoginForm";
import RegisterForm from "./components/RegisterLoginForms/RegisterForm";
import "./PrimaryPage.css"

function PrimaryPage(){
  const [buttonPressed, setButtonPressed] = useState(0);
  const [formArray, setFormArray] = useState([]);

  const handleButtonClick = (value) => {
    setButtonPressed(value);
  };

  const handleFormSubmit = (formData) => {
    setFormArray([...formArray, formData]);
    console.log(...formArray);
  };

  let content;

  if (buttonPressed === 0) {
    content = (
      <div className="PrimaryPage">
        <NavBar handleButtonClick={handleButtonClick} />
        <Description/>
        <Footer />
      </div>
    );
  } else if (buttonPressed === 1) {
    content = (
      <div className="PrimaryPage">
        <NavBar handleButtonClick={handleButtonClick} />
        <LoginForm onFormSubmit={handleFormSubmit} handleButtonClick={handleButtonClick} />
        <Footer />
      </div>
    );  
  } else if (buttonPressed === 2) {
    content = (
      <div className="PrimaryPage">
        <NavBar handleButtonClick={handleButtonClick} />
        <RegisterForm onFormSubmit={handleFormSubmit}/>
        <Footer />
      </div>
    );
  }

  return content;
}

export default PrimaryPage;