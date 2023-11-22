import React, { useEffect, useState } from 'react'
// import { useEffect } from 'react';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { getConnections } from '../../../api/FirestoreAPI';
import defaultUser from '../../../assets/user.png'

function ConnectedUsers({ user, getCurrentUser, currentUser }) {
  const [isConnected, setIsConnected] = useState(false);


  const gotoprofile = () => {
    // redirecting to profile with our current id and email
    navigate("/profile", {
      state: { id: posts?.id, email: posts.userEmail },
    })
  }

  useEffect(() => {
    getConnections(currentUser.id, user.id, setIsConnected);
  }, [currentUser.id, user.id]);

  return isConnected ? (
    <></>
  ) : (
    <div className='grid-child-container'>
    <div className="grid-child">  {/*get the user on clicking*/}

      <img src={user.imageLink||defaultUser} onClick={gotoprofile}/>
      <p onClick={gotoprofile}>{user.name}</p>
      {/* <p>{user.headline}</p> */}

      <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Connect
      </button>
    </div>
    </div>
  );
}

export default ConnectedUsers