import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import NoteDelete from "./NoteDelete";

const NoteDeleteModal = (props) => {
  return (
    <ModalWrapper size="sm" header="Note Delete">
      <NoteDelete />
    </ModalWrapper>
  );
};

export default NoteDeleteModal;
