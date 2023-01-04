import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import TaskDelete from "./TaskDelete";

const TaskDeleteModal = (props) => {
  return (
    <ModalWrapper size="sm" header="Task Delete">
      <TaskDelete />
    </ModalWrapper>
  );
};

export default TaskDeleteModal;
