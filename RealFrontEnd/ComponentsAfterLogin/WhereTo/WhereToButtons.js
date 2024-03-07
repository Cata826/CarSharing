import React from "react";
import "./WhereToButtons.css";
import { Link } from 'react-router-dom';

function WhereToButtons() {
  return (
    <div className="TwoButtons">
      <button className="whiteButton">
      <Link to="/google-map">Create a ride</Link>
      </button>
      <button className="whiteButton">
        <Link to="/google-map1">Book a ride</Link>
      </button>
    </div>
  );
}

export default WhereToButtons;
