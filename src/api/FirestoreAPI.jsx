import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "posts");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "comments");
let connectionRef = collection(firestore, "connections");

export const postStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Post added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatus = (setAllStatus) => {
//   const q = query(postsRef, orderBy("timeStamp"));
  onSnapshot(postsRef, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

//exporting all the users 
export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getSingleStatus = (setAllStatus, id) => {
  // query if the userID for the post is equal to the id of the current post
  const singlePostQuery = query(postsRef, where("userID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
      );
    });
  };
  
  export const getSingleUser = (setCurrentUser, email) => {
  // query if the email for the user is equal to the email of the current user
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {  
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
        // only 0th index contains data like email,name and id
    );
  });
};

// this edits the profile with the data passed
export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);

  // payload conatins the data to be edited
  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  };
  
  
  export const likePost = (userId, postId, liked) => {
    try{
      let docToLike = doc(likeRef, `${userId}_${postId}`);
      if (liked) {
        // dislike on second clicking the like button
        deleteDoc(docToLike);
      } else {
        //setDoc adds the document with unique id
        setDoc(docToLike, { userId, postId });
      }
    } 
    catch(err){
      console.log(err);
    }
  };
  
  
  export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
    try {
      // check if the post id are same  
      let likeQuery = query(likeRef, where("postId", "==", postId));
      
      onSnapshot(likeQuery, (response) => {
        let likes = response.docs.map((doc) => doc.data());
        let likesCount = likes?.length;
        
        // check if the like id we are getting is same as that we are getting from param  
      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount); //updating the value of likesCount
      setLiked(isLiked); //changing the state to filled like
    });
  } catch (err) {
    console.log(err);
  }
};

//function to post comment 
export const postComment = (postId, comment, timeStamp, name) => {
  try {
    addDoc(commentsRef, {
      postId,
      comment,
      timeStamp,
      name,
    });
  } catch (err) {
    console.log(err);
  }
};

//function to get all the comments to display
export const getComments = (postId, setComments) => {
  try {
    // if the postId of the collection is equal to props postId 
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments(comments);
    });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, status, postImage) => {
  let docToUpdate = doc(postsRef, id);
  try {
    updateDoc(docToUpdate, { status, postImage });
    toast.success("Post has been updated!");
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => {
  let docToDelete = doc(postsRef, id);
  try {
    deleteDoc(docToDelete);
    toast.success("Post has been Deleted!");
  } catch (err) {
    console.log(err);
  }
};

export const addConnection = (userId, targetId) => {
  try {
    let connectionToAdd = doc(connectionRef, `${userId}_${targetId}`);

    setDoc(connectionToAdd, { userId, targetId });

    toast.success("Connection Added!");
  } catch (err) {
    console.log(err);
  }
};

export const getConnections = (userId, targetId, setIsConnected) => {
  try {
    let connectionsQuery = query(
      connectionRef,
      where("targetId", "==", targetId)
    );

    onSnapshot(connectionsQuery, (response) => {
      let connections = response.docs.map((doc) => doc.data());

      const isConnected = connections.some(
        (connection) => connection.userId === userId
      );

      setIsConnected(isConnected);
    });
  } catch (err) {
    console.log(err);
  }
};