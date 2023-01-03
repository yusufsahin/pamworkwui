import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import WorkitemEdit from "./WorkitemEdit";

const WorkitemEditModal = (props) => {
  return (
    <ModalWrapper size="lg" header="Workitem Edit">
      <WorkitemEdit />
    </ModalWrapper>
  );
};

export default WorkitemEditModal;
