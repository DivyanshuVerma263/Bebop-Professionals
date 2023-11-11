import React, { useState } from 'react'
import { RegisterAPI, GoogleSignInAPI } from '../api/AuthAPI'
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import '../Sass/LoginComponent.scss';
import BepopLogo from "../assets/react.svg"
import {toast} from 'react-toastify';

const RegisterComponent = () => {
    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({});

    const register = async () => {
        // passing the email and password for authentication
        try {
            let res = await RegisterAPI(credentials.email, credentials.password);
            toast.success("Account Created!");
            navigate("/home");
        }
        catch (err) {
            toast.error("Cannot Create your account ");
            console.log(err);
        }
    }
    
    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        if(!response) toast.success("Signed In successfully!");
        navigate("/home");
    }


    return (
        <div className='login-wrapper'>
            <img src={BepopLogo} className='bepopLogo' />
            <div className="login-wrapper-inner">
                <h1 className="heading">Sign Up</h1>
                <p className="sub-heading">Stay updated on your professional world</p>
                <div className="auth-inputs">
                    <input
                        onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                        className='common-input'
                        placeholder='Email or Phone Number'
                    />

                    <input
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        type='password'
                        className='common-input'
                        placeholder='Password (6 or more characters)'
                    />

                </div>
                
                <button className='login-btn' onClick={register}>Agree & Join</button>
            </div>
            
            <hr className="hr-text" data-content="or" />
                <div className="google-btn-container">
                    
                    <GoogleButton className='google-btn'
                        onClick={googleSignIn} />
                    
                    <p className="go-to-signup">
                    Already on Bepop Professionals?{" "}
                    <span className="join-now" onClick={() => navigate("/")}>
                        Sign In
                    </span>
                    </p>
                </div>
        </div>
    )
}

export default RegisterComponent