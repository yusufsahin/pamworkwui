import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import ProjectEdit from "./ProjectEdit";

const ProjectEditModal = (props) => {
  return (
    <ModalWrapper size="lg" header="Project Edit">
      <ProjectEdit />
    </ModalWrapper>
  );
};

export default ProjectEditModal;
