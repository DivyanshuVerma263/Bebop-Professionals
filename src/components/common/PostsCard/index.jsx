import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getCurrentUser, getAllUsers} from "../../../api/FirestoreAPI";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  return (
    <>
<<<<<<< HEAD
    <div className="posts-card" >
      <p className="name">{posts.userName}</p>
=======
    <div className="posts-card" key={id}>
      <p 
        className="name" 
        onClick={() => 
          // redirecting to profile with our current id and email
          navigate("/profile", {
            state: {id: posts?.id, email: posts.userEmail},
          })
        }
        >
          {posts.userName}
      </p>

>>>>>>> main
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
    </div>
    </>
  )
};