import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { closeModal } from "../Store/modalSlice";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";

const ModalWrapper = ({ children, size, header }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Dialog open={true} maxWidth={size} fullWidth>
        {header && <DialogTitle>{header}</DialogTitle>}
        <Box top={0} right={0} position= "absolute" overflowY= "scroll"  maxHeight= "90%">
          <IconButton>
            <Close onClick={() => dispatch(closeModal())} />
          </IconButton>
        </Box>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </>
  );
};

export default ModalWrapper;
