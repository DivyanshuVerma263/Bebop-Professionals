import React, { useEffect , useState} from 'react'
// import { useEffect } from 'react';
import { getConnections } from '../../../api/FirestoreAPI';

function ConnectedUsers({user, getCurrentUser, currentUser}) {
    const [isConnected, setIsConnected] = useState(false);
    useEffect(()=>{
        getConnections(currentUser.id,user.id,setIsConnected);
    },[currentUser.id,user.id]);
    
  return  isConnected ? (
    <></>
  ) : (
    <div className="grid-child" onClick={()=> getCurrentUser(user.id)}>  {/*get the user on clicking*/}
        <p>{user.name}</p>
        <p>{user.headline}</p>
    </div>
  );
}

export default ConnectedUsers