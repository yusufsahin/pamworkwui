import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { getNotes } from "../../Store/noteSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "memo", headerName: "Memo", width: 130 },
];

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const loading = useSelector((state) => state.note.loading);
  const err = useSelector((state) => state.note.err);
  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return loading === true ? (
    <CircularProgress />
  ) : (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(openModal({ modalType: "NoteNewModal", modalProps: {} }))
        }
      >
        New
      </Button>
      <DataGrid
        rows={notes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default NoteList;
