import React, { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
function InfoForm(props) {
  const [loading,setLoading]=useState(false);
  const [userInfo, setUserInfo] = useState({
    phone_number: '',
    firstname: '',
    lastname: '',
    year: 0,
    month: 0,
    day: 0,
  });

  const handleHomeClick = () => {
    props.handleButtonClick(1);
  };


  const navigate = useNavigate();
  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.handleButtonClick(1);
    }, 5000);
  };
  useEffect(() => {
    if (props.userId) {
    
      fetch(`http://localhost:8080/api/v1/registration/users/${props.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserInfo(data);
          console.log(data.year);
          console.log(data.firstName);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, [props.userId]);

  const handleClick = () => {
    startLoading();
    fetch(`http://localhost:8080/api/v1/registration/users/${props.userId}`, {
      
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: userInfo.phone_number,
        firstname: userInfo.firstName,
        lastname: userInfo.lastName,
        year: userInfo.year,
        month: userInfo.month,
        day: userInfo.day,
      }),
    })
      .then((response) => {
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        return response.json();
      })
      props.handleButtonClick(1);

      // .then((data) => {
      //   console.log('User information updated successfully:', data);
        
      // })
      // .catch((error) => {
      //   console.error('Error updating user information:', error);
      // });
  };
  
  
  const {  firstName, lastName, phone_number,year, month, day } = userInfo;

  console.log(props.userId);

  return (
    <div className="InfoForm">
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
      <form action="">

        <h1>Account Configuration </h1>
        <div className="input-box">
          <input type="text" placeholder="Phone" value={phone_number} onChange={(e) => setUserInfo({ ...userInfo, phone_number: e.target.value })} required/>
        </div>
        <div className="input-box">
          <input type="text" placeholder="firstname" value={firstName} onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })} required/>
        
        </div>
        <div className="input-box">
          <input type="text" placeholder="lastname" value={lastName} onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })} required/>
        
        </div>
        <div className="input-box">
          <input type="number" placeholder="Year" value={year} onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })} required/>
          
        </div>
        <div className="input-box">
          <input type="number" placeholder="Month" value={month} onChange={(e) => setUserInfo({ ...userInfo, month: e.target.value })} required/>
         
        </div>
        <div className="input-box">
          <input type="number" placeholder="Day" value={day} onChange={(e) => setUserInfo({ ...userInfo, day: e.target.value })} required/>
         
        </div>
        <button type="button" className="btn" onClick = {handleClick} onHomeClick = {handleHomeClick}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default InfoForm;
