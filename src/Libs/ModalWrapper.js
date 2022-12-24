import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { closeModal } from "../Store/modalSlice";

import { useDispatch } from "react-redux";

const ModalWrapper = ({ children, size, header }) => {
  const dispatch = useDispatch();
  return (
  <>
    <Dialog open={true} onClose={() => dispatch(closeModal())} maxWidth={size}>
      {header && <DialogTitle>{header}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
    </Dialog>
    </>
  );
};

export default ModalWrapper;
