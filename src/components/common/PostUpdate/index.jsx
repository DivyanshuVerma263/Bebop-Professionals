import React, { useState, useMemo } from "react";
import { postStatus, getStatus, updatePost } from "../../../api/FirestoreAPI";
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


    const getEditData = (posts) => {
        setModalOpen(true);
        setStatus(posts?.status);
        setCurrentPost(posts);
        setIsEdit(true);
    };


    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp("LLL"),
            userEmail: currentUser.email,
            userName: currentUser.name,
            postID: getUniqueID(),
            userID: currentUser.id,
        }

        //adding the object
        await postStatus(object);

        // close the modal
        setModalOpen(false);

        //reseting to default so that we don't see the added document again for posting
        setStatus('');

    }

    // to display all the posts by retreiving them
    useMemo(() => {
        getStatus(setAllStatus);
    }, []);

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
                        className="open-post-modal"
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