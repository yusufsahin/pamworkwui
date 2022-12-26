import React from "react";
import ModalWrapper from "../../Libs/ModalWrapper";
import NoteEdit from "./NoteEdit";

const NoteEditModal = (props) => {
  return (
    <ModalWrapper size="lg" header="Note Edit">
      <NoteEdit />
    </ModalWrapper>
  );
};

export default NoteEditModal;
