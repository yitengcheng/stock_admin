import { Modal } from "antd";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import useStateRef from "react-usestateref";
import styles from "./index.module.less";

const MyModal = (props: any, ref: any) => {
  const { title, children } = props;
  const [isModalOpen, setIsModalOpen] = useStateRef(false);

  useImperativeHandle(ref, () => ({
    openModal: () => {
      openModal();
    },
    closeModal: () => {
      closeModal();
    },
  }));
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal title={title} open={isModalOpen} footer={null} onCancel={closeModal}>
      {children}
    </Modal>
  );
};

export default forwardRef(MyModal);
