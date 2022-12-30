import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import ProjectDelete from "./ProjectDelete";

const ProjectDeleteModal = (props) => {
  return (
    <ModalWrapper size="sm" header="Project Delete">
      <ProjectDelete />
    </ModalWrapper>
  );
};

export default ProjectDeleteModal;
