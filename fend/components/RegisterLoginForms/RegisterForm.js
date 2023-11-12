import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css"

function RegisterForm(props){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");

    const navigate = useNavigate();
  
    const handleButtonClicked = () => {
        const formData = { email, password, passwordAgain };
    
        if (formData.password === formData.passwordAgain) {
            fetch('http://localhost:8080/api/v1/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {if(response){
                navigate("./MainApp");
            }})
        } else {
            console.error('Passwords do not match');
        }
    };
    

    return(
        <div class="RegisterForm">
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
                <button type="button" className="btn" onClick={handleButtonClicked}>Register</button>
            </form>
        </div>
    );
}

export default RegisterForm