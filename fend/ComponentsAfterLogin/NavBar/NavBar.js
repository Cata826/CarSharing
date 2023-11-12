import React, { useState } from "react";
import "./NavBar.css"

function NavBar(props){

  const handleHomeClick = () => {
    props.handleButtonClick(0);
  };

  const handleUserClick = () => {
    props.handleButtonClick(1);
  };
    
  return(
      <div className="NavBar">
          <div id="NameButton">
              <button onClick={handleHomeClick}>RideSharingApp</button>
          </div>
          <div>
              <button id="UserButton" onClick={handleUserClick}><i className='bx bxs-user'></i></button>
          </div>
      </div>
  );
}

export default NavBar;