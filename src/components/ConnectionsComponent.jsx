import React, { useEffect , useState} from 'react'
import { getAllUsers } from '../api/FirestoreAPI'
import { addConnection, getConnections } from '../api/FirestoreAPI'
import ConnectedUsers from './common/ConnectedUsers'
import "../Sass/ConnectionsComponent.scss"

function ConnectionsComponent({currentUser}) {
    const [users,setUsers]=useState([]);
    
    const getCurrentUser=(id)=>{
        addConnection(currentUser.id, id);
    }
  
    useEffect(()=>{
      getAllUsers(setUsers);
    },[]);
    

    return users.length > 0 ? (
        <div className="connections-main">
          {users.map((user,index) => {
            return user.id === currentUser.id ? (
              <></>
            ) : (
              <ConnectedUsers
                key={index}
                currentUser={currentUser}
                user={user}
                getCurrentUser={getCurrentUser}
              />
            );
          })}
        </div>
  ):(
    <div className="connections-main">No Connections to Add!</div>
    );
}

export default ConnectionsComponent