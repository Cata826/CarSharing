import React, { useState } from "react";
import "./InfoForm.css";

function InfoForm(props){

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const handleSubmitButtonClicked = () => {
        const formData = { firstName, lastName };
        let id;
        
        fetch('http://localhost:8080/api/v1/registration/id', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        fetch('http://localhost:8080/api/v1/registration', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        props.handleSubmitButtonClicked(0);
  }

    return(
    <div className="InfoForm">
      <form>
        <h1>Your Data</h1>
        <div className="input-box">
          <input type="text" placeholder="First Name" value={firstName}
          onChange={(e) => setFirstName(e.target.value)} required/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
        </div>
        <div>
        <button type="button" className="btn" onClick={handleSubmitButtonClicked}>Submit</button>
        </div>
      </form>
    </div>
);
}

export default InfoForm;