import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import WorkitemDelete from "./WorkitemDelete";

const WorkitemDeleteModal = (props) => {
  return (
    <ModalWrapper size="sm" header="Workitem Delete">
      <WorkitemDelete />
    </ModalWrapper>
  );
};

export default WorkitemDeleteModal;
