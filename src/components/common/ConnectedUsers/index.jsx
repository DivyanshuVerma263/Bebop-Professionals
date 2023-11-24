import React, { useEffect, useState } from 'react'
// import { useEffect } from 'react';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections } from '../../../api/FirestoreAPI';
import defaultUser from '../../../assets/user.png'
import { useNavigate } from 'react-router-dom';

function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  let navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);


  const gotoprofile = () => {
    // redirecting to profile with our current id and email
    navigate("/profile", {
      state: { id: posts?.id, email: posts.userEmail },
    })
  }

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user.id,
        email: user.email,
      },
    });
  };

  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);

  return isConnected ? (
    <></>
  ) : (
    <div className='grid-child-container'>
      <div className="grid-child">  {/*get the user on clicking*/}
        
        <img src={user.imageLink || defaultUser} onClick={() => openUser(user)} />
        <p className='name' onClick={() => openUser(user)} >
          {user.name}
        </p>
        {/* <p className='headline'>{user.headline}</p> */}
        <button onClick={() => getCurrentUser(user.id)}>
          <AiOutlineUsergroupAdd size={20} />
          Connect
        </button>
      </div>
    </div>
  );
}

export default ConnectedUsers