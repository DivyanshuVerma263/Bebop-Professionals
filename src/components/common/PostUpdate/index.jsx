import React, { useState } from 'react'
import ModalComponent from '../Modal';
import './index.scss'

function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [allStatuses, setAllStatus] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const [postImage, setPostImage] = useState(""); 

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
            <ModalComponent modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>
    )
}

export default PostStatus