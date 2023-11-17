import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {getCurrentUser, getAllUsers} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  
  //function to get currentUser 
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  return (
    <>
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

      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>

      <LikeButton 
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser} />
    </div>
    </>
  )
};