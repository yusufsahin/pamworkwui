import React from "react";
import NoteForm from "./NoteForm";
import ModalWrapper from "../../Libs/ModalWrapper";

const NoteNew = () => {
  return (
    <>
      <ModalWrapper size="lg" header="Note New">
        <NoteForm />
      </ModalWrapper>
    </>
  );
};

export default NoteNew;
