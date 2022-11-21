import { Modal } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';
import useStateRef from 'react-usestateref';

const MyModal = (props: any, ref: any) => {
  const { title, children, reset } = props;
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
    reset && reset();
    setIsModalOpen(false);
  };
  return (
    <Modal title={title} open={isModalOpen} footer={null} onCancel={closeModal}>
      {children}
    </Modal>
  );
};

export default forwardRef(MyModal);
