// MainApp.js
import React, { useState } from "react";
import NavBar from "./ComponentsAfterLogin/NavBar/NavBar.js";
import InfoForm from "./ComponentsAfterLogin/InformationForm/InfoForm.js";
import WhereToButtons from "./ComponentsAfterLogin/WhereTo/WhereToButtons.js";
import "./MainApp.css";

function MainApp(props) {
  const [buttonPressed, setButtonPressed] = useState(0);
  let userId = props.userId;
  //const { userId } = props; 
  console.log(props.userId);

  const handleButtonClick = (value) => {
    setButtonPressed(value);
  };

  let content;

  if (buttonPressed === 0) {
    content = (
      <div className="MainApp">
        <NavBar handleButtonClick={handleButtonClick} />
        <WhereToButtons />
        
      </div>
    );
  } else if (buttonPressed === 1) {
    content = (
      <div className="MainApp">
        <NavBar handleButtonClick={handleButtonClick} />
        <InfoForm userId={userId} handleButtonClick = {handleButtonClick}/>
     
      </div>
    );
  }

  return content;
}

export default MainApp;