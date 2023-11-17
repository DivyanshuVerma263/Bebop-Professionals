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
      if(!res?.accessToken){  //if token doesn't exist ,then navigate to login page 
        navigate("/"); 
      }
      else {
        setLoading(false);  //if token exist then loading state is to be false and HomeComponent is rendered
      }
    })
  },[]);

  return (
    loading ?  //if loading is true then call the loader
    <Loader /> :
    <HomeComponent currentUser={currentUser}/>
  )
}

export default Home