import React, { useState } from 'react'
import { useEffect } from 'react'
import ConnectionsComponent from '../components/ConnectionsComponent'
import Loader from '../components/common/Loader'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'


function Connections({currentUser}) {
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
    <ConnectionsComponent currentUser={currentUser}/>
  )
}

export default Connections