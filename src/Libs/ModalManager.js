import React from "react";
import { useSelector } from "react-redux";
import TestModal from "../Components/Sandbox/TestModal";
import NoteNewModal from "../Components/Notes/NoteNewModal";
import NoteEditModal from "../Components/Notes/NoteEditModal";
import NoteDeleteModal from "../Components/Notes/NoteDeleteModal";

const ModalManager = () => {
  const modalLookup = {
    TestModal,
    NoteNewModal,
    NoteEditModal,
    NoteDeleteModal
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
