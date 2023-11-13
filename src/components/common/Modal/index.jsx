import React from "react";
import { Button, Modal } from "antd";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  status,
  setStatus,
  sendStatus,
  isEdit,
  updateStatus
}) => {
  
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
          <Button
            onClick={isEdit ? updateStatus : sendStatus}
            key="submit"
            type="primary"
            // post button active only when something is written
            disabled={status.length > 0 ? false : true}>
            {isEdit ? "Update" : "Post"}
          </Button>,
        ]}
      >
          <input className="modal-input"
            placeholder="Write something to post"
            onChange={(event)=>setStatus(event.target.value)}/>

      </Modal>
    </>
  );
};

export default ModalComponent;