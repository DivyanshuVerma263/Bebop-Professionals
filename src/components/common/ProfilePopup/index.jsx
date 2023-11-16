import React, { useState, useMemo } from 'react'
import { onLogout } from '../../../api/AuthAPI'
import Button from '../Button'
import { getCurrentUser } from '../../../api/FirestoreAPI'
import './index.scss'
import { useNavigate } from 'react-router-dom';

function ProfilePopup() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className='popup-card'>
      <p className="name">{currentUser?.name}</p>
      <p className="headline">{currentUser?.headline}</p>
      <Button
        title="My Profile"
        onClick={() =>
          navigate("/profile", {
            state: {
              id: currentUser?.userID,
            },
          })
        }
      />

      <Button title="Log out" onClick={onLogout} />
    </div>
  )
}

export default ProfilePopup