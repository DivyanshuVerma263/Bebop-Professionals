import React, { useState } from "react";
import { Button, Modal, Progress} from "antd";
import {AiOutlinePicture} from "react-icons/ai";
import ReactQuill from "react-quill";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendStatus,
  isEdit,
  updateStatus,
  uploadPostImage,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  
  const [progress,setProgress]=useState(0);
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        footer={[
          <Button className="btn"
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            // post button active only when something is written
            disabled={status.length > 0 ? false : true}>
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
          {/* <textarea className="modal-input"
            placeholder="Write something to post"
            onChange={(event)=>setStatus(event.target.value)}/> */}

          <div className="posts-body">
          <ReactQuill
            className="modal-input modal_input"
            theme="snow"
            value={status}
             placeholder="Share Something"
            onChange={setStatus}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            //shows the progress of uploading in percentage format 
            <div className="progress-bar">
              <Progress type="circle" percent={progress} />
            </div>
          )}
          {/*image can only be uploaded in these conditions */}
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}
        </div>
        <label for="pic-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type={"file"}  //taking a file input for the image to be uploaded
          hidden
          onChange={(event) =>
            uploadPostImage(event.target.files[0], setPostImage, setProgress)   //uploading the image and setting it
          }
        />

      </Modal>
    </>
  );
};

export default ModalComponent;