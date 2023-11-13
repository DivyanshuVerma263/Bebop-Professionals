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
    <div className="posts-card" >
      <p className="name">{posts.userName}</p>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
    </div>
    </>
  )
};