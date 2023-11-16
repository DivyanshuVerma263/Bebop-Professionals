import React, {useMemo, useState} from 'react'
import Profile from '../Pages/Profile'
import { getCurrentUser } from '../api/FirestoreAPI'
import Topbar from '../components/common/Topbar'


function ProfileLayout() {
  
  const [currentUser, setCurrentUser] = useState({});

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  },[]);
  return (
    <div>
        <Topbar currentUser={currentUser}/>
        <Profile currentUser={currentUser}/>
    </div>
  )
}

export default ProfileLayout