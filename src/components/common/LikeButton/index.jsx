import React, { useMemo, useState } from 'react'
import { AiOutlineLike, AiFillLike } from 'react-icons/ai'
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import { getLikesByUser, likePost } from '../../../api/FirestoreAPI'
import './index.scss'


function LikeButton({ userId, postId }) {
    const [likesCount, setLikesCount] = useState(0);
    const [liked, setLiked] = useState(false);
    
    const handleLike = () => {
        likePost(userId, postId, liked);
    }

    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
    })

    return (
        <div className='like-container' onClick={handleLike}>
            <p>{likesCount} User Like this Post</p>
            <div className="hr-line">
                <hr />
            </div>

            <div className="likes-comment-inner" onClick={handleLike}>
                {liked ? (
                    <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
                ) : (
                    <BsHandThumbsUp size={30} />
                )}

                <p className={liked ? "blue" : "black"}>Like</p>
            </div>
        </div>
    )
}

export default LikeButton