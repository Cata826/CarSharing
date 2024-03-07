import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css"
import { Spinner } from "@chakra-ui/react";

function RegisterForm(props){
    const handleLoginClick = () => {
        props.handleButtonClick(1);
      };
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const startLoading = () => {
        setLoading(true);
        
        setTimeout(() => {
          setLoading(false);
        }, 5000); 
      };
    const handleButtonClicked = () => {
        const formData = { email, password, passwordAgain };
        startLoading();
        if (formData.password === formData.passwordAgain) {
            fetch('http://localhost:8080/api/v1/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {if(response){
                navigate("./");
                handleLoginClick();
            }})
        } else {
            console.error('Passwords do not match');
        }
    };
    
    
    
    return(
        <div class="RegisterForm">
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
            zIndex: 9999, // Make sure it's on top of other elements
          }}
        >
          <Spinner size="xl" color="blue.500" />
        </div>
      )}
            <form action="">
                <h1>Register</h1>
                <div class="input-box">
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <i class='bx bxs-envelope'></i>
                </div>
                <div class="input-box">
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                <div class="input-box">
                <input type="password" placeholder="Repeat password" value={passwordAgain} onChange={(e) => setPasswordAgain(e.target.value)} required/>
                    <i class='bx bxs-lock-alt'></i>
                </div>
                 <button type="button" className="btn" onClick={handleButtonClicked}>
                    Register</button> 
                    
            </form>
        </div>
    );
}

export default RegisterForm