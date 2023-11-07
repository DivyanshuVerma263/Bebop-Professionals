import React, { useState } from 'react'
import { LoginAPI } from '../api/AuthAPI'
import '../Sass/LoginComponent.scss';

const LoginComponent = () => {
    const [credentials, setCredentials]=useState({});
    
    const login = () =>{
        // passing the email and password for authentication
        LoginAPI(credentials.email, credentials.password);
    }


  return (
    <div className='login-wrapper'>
        <h1>LoginComponent</h1>
        <div className="auth-inputs">
            <input 
                onChange={(event)=> setCredentials({...credentials, email: event.target.value})}
                className='common-input'
                placeholder='Enter your Email'
            />
            
            <input 
                onChange={(event)=> setCredentials({...credentials, password: event.target.value})}
                className='common-input'
                placeholder='Enter your Password'
            />
            
        </div>
        <button className='login-btn' onClick={login}>Log In</button>
    </div>
  )
}

export default LoginComponent