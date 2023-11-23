import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost} from "../../../api/FirestoreAPI";
import {uploadPostImage} from "../../../api/ImageUpload";
import { getCurrentTimeStamp } from "../../../../helpers/useMoment";
import ModalComponent from "../Modal";
import { getUniqueID } from "../../../../helpers/getUniqueId";
import PostsCard from "../PostsCard";
import user from '../../../assets/user.png'
import "./index.scss";

function PostStatus({ currentUser }) {

    const [modalOpen, setModalOpen] = useState(false); 
    const [status, setStatus] = useState("");
    const [allStatuses, setAllStatus] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    
    const [postImage, setPostImage] = useState("");
    
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp("LLL"),
            userEmail: currentUser.email,
            userName: currentUser.name,
            postID: getUniqueID(),
            userID: currentUser.id,
            postImage: postImage,
        }

        //adding the object
        await postStatus(object);

        // close the modal
        await setModalOpen(false);

        setIsEdit(false);

        //reseting to default so that we don't see the added document again for posting
        await setStatus('');

    }
    
    // function to get data for editing post
    const getEditData = (posts) => {
        setModalOpen(true);
        setStatus(posts?.status);
        setCurrentPost(posts);
        setIsEdit(true);
    };


    const updateStatus = () => {
        updatePost(currentPost.id, status, postImage);
        setModalOpen(false);
    }



    // to display all the posts by retrieving them
    useMemo(() => {
        getStatus(setAllStatus);
    }, []);

    //to create a post 
    return (
            <div className="post-status-main">            
                <div className="user-details">
                    <img src={(currentUser?.imageLink)||user} alt="imageLink" />
                    <p className="name">{currentUser?.name}</p>
                    <p className="headline">{currentUser?.headline}</p>
                </div>
                <div className="post-status">
                    <img
                        className="post-image"
                        src={currentUser?.imageLink||user}
                        alt="imageLink"
                    />
                    <button
                        className="open-post-modal"   //pop up which appears when you want to post something
                        onClick={() => {
                            setModalOpen(true);
                            setIsEdit(false);
                        }}
                    >
                        Create a Post
                    </button>
                </div>
                <ModalComponent 
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    status={status}
                    setStatus={setStatus}
                    sendStatus={sendStatus}
                    isEdit={isEdit}
                    updateStatus={updateStatus}
                    uploadPostImage={uploadPostImage}
                    postImage={postImage}
                    setPostImage={setPostImage}
                    setCurrentPost={setCurrentPost}
                    currentPost={currentPost}
                />

                <div>
                    {allStatuses.map((posts) => {
                        console.log(posts);
                        return (
                            <>
                                <PostsCard posts={posts} getEditData={getEditData} />
                            </>
                        )
                    })}
                </div>

            </div>
    )
}

export default PostStatus