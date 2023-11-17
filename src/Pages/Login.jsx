import React, { useState } from 'react'
import LoginComponent from '../components/LoginComponent'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from '../firebaseConfig'
import Loader from '../components/common/Loader'

const Login = () => {
<<<<<<< HEAD
  const [loading,setLoading]=useState(true);

  let navigate=useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(res?.accessToken){
        navigate("/home");
      }
      else{
        setLoading(false);
=======
  const [loading,setLoading]=useState(true); //used to manage the state of the loader

  let navigate=useNavigate(); 

  useEffect(() => {
    onAuthStateChanged(auth, res => {
      if(res?.accessToken){    //if token exists then navigate to home page
        navigate("/home");
      }
      else{
        setLoading(false); //if token doesn't exist then we need to return to the login page 
>>>>>>> main
      }
    })
  },[]);


  return (
<<<<<<< HEAD
    loading 
    ?
      <Loader /> 
    :
      <LoginComponent />
=======
    loading  
    ?
      <Loader /> // a visual indicator to communicate to user that data is being fetched or processed
    :
      <LoginComponent /> //if loading is false then show the login page
>>>>>>> main
  )
}

export default Login