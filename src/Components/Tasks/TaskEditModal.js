import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import TaskEdit from "./TaskEdit";

const TaskEditModal = (props) => {
  return (
    <ModalWrapper size="lg" header="Task Edit">
      <TaskEdit />
    </ModalWrapper>
  );
};

export default TaskEditModal;
