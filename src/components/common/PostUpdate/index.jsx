import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI";
// import { getCurrentTimeStamp } from "../../../helpers/useMoment";
import ModalComponent from "../Modal";
// import { uploadPostImage } from "../../../api/ImageUpload";
// import { getUniqueID } from "../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import "./index.scss";

function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatuses, setAllStatus] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [postImage, setPostImage] = useState(""); 
    
    
    const sendStatus = async () => {
        let object = {
            status: status,
            // timeStamp: getCurrentTimeStamp("LLL"),
            // userEmail: currentUser.email,
            // userName: currentUser.name,
            // postID: getUniqueID(),
            // userID: currentUser.id,
            postImage: postImage,
          };
        //adding the object
        await postStatus(object); 
        
        // close the modal
        await setModalOpen(false); 
        
        //reseting to default so that we don't see the added document again for posting
        await setStatus(""); 
    }

    useMemo(() => {
        getStatus(setAllStatus);
    }, []);
    
// console.log(allStatuses);
    return (
        <div className="post-status-main">
            <div className="user-details">
                {/* <img src={currentUser?.imageLink} alt="imageLink" /> */}
                {/* <p className="name">{currentUser?.name}</p>
                <p className="headline">{currentUser?.headline}</p> */}
            </div>
            <div className="post-status">
                <img
                    className="post-image"
                    // src={currentUser?.imageLink}
                    alt="imageLink"
                />
                <button
                    className="open-post-modal"
                    onClick={() => {
                        setModalOpen(true);
                        setIsEdit(false);
                    }}
                >
                    Start a Post
                </button>
            </div>
            <ModalComponent 
                modalOpen={modalOpen} 
                setModalOpen={setModalOpen}
                status={status}
                setStatus={setStatus}
                sendStatus={sendStatus} 
            />

            <div>
                {allStatuses.map((posts) => {
                    return (
                        <PostsCard posts={posts}/>
                    )
                })}
            </div>

        </div>
    )
}

export default PostStatus