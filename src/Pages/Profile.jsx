import React, { useState } from 'react'
import { useEffect } from 'react'
import ProfileComponent from '../components/ProfileComponent'
import Loader from '../components/common/Loader'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebaseConfig'

function Profile({ currentUser }) {
    const [loading, setLoading] = useState(true);
    // this is done to ensure that profile is rendered only if the user is logged in
    let navigate = useNavigate();
    useEffect(() => {
        onAuthStateChanged(auth, res => {
            if (!res?.accessToken) {  //if token exists then navigate to login page
                navigate("/");
            }
            else {
                setLoading(false);
            }
        })
    }, []);

    return (
       loading ? <Loader /> : <ProfileComponent currentUser={currentUser}/>
    )
}

export default Profile