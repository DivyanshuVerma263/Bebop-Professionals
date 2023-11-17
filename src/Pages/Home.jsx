import React, { useState } from 'react'
import { useEffect } from 'react'
import HomeComponent from '../components/HomeComponent'
import Loader from '../components/common/Loader'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'


function Home({currentUser}) {
  const [loading,setLoading]=useState(true);

  let navigate=useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, res => {
<<<<<<< HEAD
      if(!res?.accessToken){
        navigate("/");
      }
      else {
        setLoading(false);
=======
      if(!res?.accessToken){  //if token exists then navigate to the home page 
        navigate("/"); 
      }
      else {
        setLoading(false);  //if token doesn't exist then loading state is to be false 
>>>>>>> main
      }
    })
  },[]);

  return (
<<<<<<< HEAD
    loading ?
=======
    loading ?  //if loading is true then call the loader
>>>>>>> main
    <Loader /> :
    <HomeComponent currentUser={currentUser}/>
  )
}

export default Home