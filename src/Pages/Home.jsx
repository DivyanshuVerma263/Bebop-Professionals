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
      if(!res?.accessToken){
        navigate("/");
      }
      else {
        setLoading(false);
      }
    })
  },[]);

  return (
    loading ?
    <Loader /> :
    <HomeComponent currentUser={currentUser}/>
  )
}

export default Home