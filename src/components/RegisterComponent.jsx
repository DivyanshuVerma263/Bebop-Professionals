import React, { useState } from 'react'
import { RegisterAPI, GoogleSignInAPI} from '../api/AuthAPI'
import {postUserData} from "../api/FirestoreAPI"
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
=======
import {getUniqueID} from '../../helpers/getUniqueId'
>>>>>>> main
import GoogleButton from 'react-google-button';
import BepopLogo from "../assets/BebopLogo.png"
import {toast} from 'react-toastify';
import '../Sass/LoginComponent.scss';

const RegisterComponent = () => {
    let navigate=useNavigate();
    const [credentials, setCredentials] = useState({});

    const register = async () => {
        // passing the email and password for authentication
        try {
            let res = await RegisterAPI(credentials.email, credentials.password);
            toast.success("Account Created!");
<<<<<<< HEAD
            postUserData({name: credentials.name, email: credentials.email});
            localStorage.setItem('userEmail', res.user.email);
=======
            postUserData({                  //data of the user
                userID: getUniqueID(),
                name: credentials.name,       
                email: credentials.email
            });
            localStorage.setItem('userEmail', res.user.email);  //updates/sets the value to the given email
>>>>>>> main
            navigate('/home');
        }
        catch (err) {
            toast.error("Cannot Create your account ");
            console.log(err);
        }
    }
    
    const googleSignIn = () => {
        let response = GoogleSignInAPI();
        if(!response) toast.success("Signed In successfully!");
<<<<<<< HEAD
        navigate("/home");
=======
        navigate("/home");   //navigate to the home page if signed in
>>>>>>> main
    }


    return (
        <div className='login-wrapper'>
            <img src={BepopLogo} className='bepopLogo' />
            <div className="login-wrapper-inner">
                <h1 className="heading">Sign Up</h1>
                <p className="sub-heading">Work...Connect...Grow...</p>
                <div className="auth-inputs">
<<<<<<< HEAD
                    <input
                        onChange={(event) => setCredentials({ ...credentials, name: event.target.value })}
                        type='text'
                        className='common-input'
                        placeholder='Your Name'
                    />
                    <input
                        onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                        className='common-input'
                        placeholder='Email or Phone Number'
                    />

                    <input
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        type='password'
                        className='common-input'
=======
                    <input    //enter user's name
                        onChange={(event) => setCredentials({ ...credentials, name: event.target.value })}
                        type='text' 
                        className='common-input input'
                        placeholder='Your Name'
                    />
                    <input    //enter email or phone number
                        onChange={(event) => setCredentials({ ...credentials, email: event.target.value })}
                        className='common-input input'
                        placeholder='Email or Phone Number'
                    />

                    <input        //enter thepassword
                        onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                        type='password'
                        className='common-input input'
>>>>>>> main
                        placeholder='Password (6 or more characters)'
                    />

                </div>
                
                <button 
                    className='login-btn' 
                    onClick={register}>
<<<<<<< HEAD
                        Agree & Join
=======
                        Agree & Join?
>>>>>>> main
                </button>
            </div>
            
            <hr className="hr-text" data-content="or" />
<<<<<<< HEAD
                <div className="google-btn-container">
=======
                <div className="google-btn-container">   
>>>>>>> main
                    
                    <GoogleButton className='google-btn'
                        onClick={googleSignIn} />
                    
                    <p className="go-to-signup">
                    Already on Bebop Professionals?{" "}
                    <span className="join-now" onClick={() => navigate("/")}>
                        Sign In
                    </span>
                    </p>
                </div>
        </div>
    )
}

export default RegisterComponent