import React, { useState } from 'react'
import { LoginAPI, GoogleSignInAPI } from '../api/AuthAPI'
import { useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button';
import BepopLogo from "../assets/BebopLogo.png"
import {toast} from 'react-toastify';
import '../Sass/LoginComponent.scss';

const LoginComponent = () => {
    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({});

    const login = async () => {
        // passing the email and password for authentication
        try {
            let res = await LoginAPI(credentials.email, credentials.password);
<<<<<<< HEAD
            toast.success("Signed In successfully!");
            localStorage.setItem('userEmail', res.user.email);
            navigate('/home');
        }
        catch (err) {
=======
            toast.success("Signed In successfully!");  //success message
            localStorage.setItem('userEmail', res.user.email);
            navigate('/home'); //if signed in successfully then navigate to the home page
        }
        catch(err){
>>>>>>> main
            toast.error("Please check your Credentials");
            console.log(err);
        }
    }
    
    // async and await used so that user is first logged in and then the toast message is displayed
    const googleSignIn = async () => {
        try{
            let response = await GoogleSignInAPI();
            toast.success("Signed In successfully!");
            localStorage.setItem('userEmail', response.user.email);
            
        }
        catch(err){
            toast.error("Wrong Credentials!!!");
<<<<<<< HEAD
            console.log(err);
=======
            console.log(err);  //Error message
>>>>>>> main
        }
        
    }


    return (
<<<<<<< HEAD
        <div className='login-wrapper'>
            <img src={BepopLogo} className='bepopLogo' />
            <div className="login-wrapper-inner">
                <h1 className="heading">Sign in</h1>
                <p className="sub-heading">Stay updated on your professional world</p>
                <div className="auth-inputs">
                    <input
                        onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                        className='common-input'
                        placeholder='Enter your Email'
                    />

                    <input
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        type='password'
                        className='common-input'
=======
        <div className='login-wrapper'> 
            <img src={BepopLogo} className='bepopLogo' />  
            <div className="login-wrapper-inner"> 
                <h1 className="heading">Sign in</h1>  
                <p className="sub-heading">Stay updated on your professional world</p>
                <div className="auth-inputs"> 
                    <input   //entering the email
                        onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                        className='common-input input'
                        placeholder='Enter your Email'
                    />

                    <input  //entering the password
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        type='password' 
                        className='common-input input'
>>>>>>> main
                        placeholder='Enter your Password'
                    />

                </div>
                
<<<<<<< HEAD
                <button className='login-btn' onClick={login}>Log In</button>
            </div>
            
            <hr className="hr-text" data-content="or" />
=======
                <button className='login-btn' onClick={login}>Log In</button> 
            </div>

            <hr className="hr-text" data-content="or" /> 
>>>>>>> main
                <div className="google-btn-container">
                    
                    <GoogleButton className='google-btn'
                        onClick={googleSignIn} />
                    
                    <p className="go-to-signup">
                    New to Bebop Professionals?{" "}
                    <span className="join-now" onClick={() => navigate("/register")}>
<<<<<<< HEAD
                        Join now
=======
                        Join now 
>>>>>>> main
                    </span>
                    </p>
                </div>
        </div>
    )
}

export default LoginComponent