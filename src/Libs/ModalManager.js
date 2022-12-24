import React from "react";
import { useSelector } from "react-redux";
import TestModal from "../Components/Sandbox/TestModal";

const ModalManager = () => {
  const modalLookup = {
    TestModal
  };
  const currentModal = useSelector((state) => state.modal);
  let renderedModal;
  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];
    renderedModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderedModal}</span>;
};
export default ModalManager;
