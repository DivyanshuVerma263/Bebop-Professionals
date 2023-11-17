import React, { useMemo, useState } from "react";
import {
    likePost,
    getLikesByUser,
    postComment,
    getComments,
} from "../../../api/FirestoreAPI";
import { getCurrentTimeStamp } from "../../../../helpers/useMoment";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";

function LikeButton({ userId, postId, currentUser }) {
    const [likesCount, setLikesCount] = useState(0);
    const [showCommentBox, setShowCommentBox] = useState(false);
    const [liked, setLiked] = useState(false);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]); //array of comments

    //handling the likes
    const handleLike = () => {
        likePost(userId, postId, liked);
    }

    //handling the comments input
    const getComment = (event) => {
        setComment(event.target.value);
    }

    //passing the comments details
    const addComment = () => {
        postComment(postId, comment, getCurrentTimeStamp("LLL"), currentUser?.name);
        setComment("");
    };

    useMemo(() => {
        getLikesByUser(userId, postId, setLiked, setLikesCount);
        getComments(postId, setComments);
    })

    return (
        <div className='like-container'>
            <p>{likesCount} User Like this Post</p>
            <div className="hr-line">
                <hr />
            </div>

            <div className="like-comment">

                <div className="likes-comment-inner" onClick={handleLike}>
                    {liked ? (
                        <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
                    ) : (
                        <BsHandThumbsUp size={30} />
                    )}

                    <p className={liked ? "blue" : "black"}>Like</p>
                </div>

                {/* show commentbox only when clicked */}
                <div className="likes-comment-inner" onClick={() => setShowCommentBox(!showCommentBox)}>
                    <AiOutlineComment
                        size={30}
                        color={showCommentBox ? "#0a66c2" : "#212121"}
                    />


                    <p className={showCommentBox ? "blue" : "black"}>Comments</p>
                </div>
            </div>
            {showCommentBox ? (
                <>
                    <input
                        onChange={getComment}
                        placeholder='Add a comment'
                        className='comment-input'
                        name="comment"
                        value={comment}
                    />
                    <button
                        className='add-comment-btn'
                        onClick={addComment}
                    >
                        Add Comment
                    </button>

                    {/* Show comments only when there are comments on post */}
                    {comments.length > 0 ? (
                        comments.map((comment) => {
                            return (
                                <div className="all-comments">
                                    <p className="name">{comment.name}</p>
                                    <p className="comment">{comment.comment}</p>
                                    
                                    <p className="timestamp">{comment.timeStamp}</p>

                                </div>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </>
            ) : (
                <></>
            )}
        </div>
    )
}

export default LikeButton