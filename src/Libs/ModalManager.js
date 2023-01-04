import React from "react";
import { useSelector } from "react-redux";
import TestModal from "../Components/Sandbox/TestModal";
import NoteNewModal from "../Components/Notes/NoteNewModal";
import NoteEditModal from "../Components/Notes/NoteEditModal";
import NoteDeleteModal from "../Components/Notes/NoteDeleteModal";
import ProjectNewModal from "../Components/Projects/ProjectNewModal";
import ProjectEditModal from "../Components/Projects/ProjectEditModal";
import ProjectDeleteModal from "../Components/Projects/ProjectDeleteModal";

import WorkitemNewModal from "../Components/Workitems/WorkitemNewModal";
import WorkitemEditModal from "../Components/Workitems/WorkitemEditModal";
import WorkitemDeleteModal from "../Components/Workitems/WorkitemDeleteModal";

import TaskNewModal from "../Components/Tasks/TaskNewModal";
import TaskEditModal from "../Components/Tasks/TaskEditModal";
import TaskDeleteModal from "../Components/Tasks/TaskDeleteModal";

const ModalManager = () => {
  const modalLookup = {
    TestModal,
    NoteNewModal,
    NoteEditModal,
    NoteDeleteModal,
    ProjectNewModal,
    ProjectEditModal,
    ProjectDeleteModal,
    WorkitemNewModal,
    WorkitemEditModal,
    WorkitemDeleteModal,
    TaskNewModal,
    TaskEditModal,
    TaskDeleteModal
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
