import React, { useEffect } from "react";
import { DataGrid, GridColDef, GridApi, GridCellValue } from "@mui/x-data-grid";

import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { getNotes, changeNote } from "../../Store/noteSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "description", headerName: "Description", width: 130 },
  { field: "memo", headerName: "Memo", width: 130 },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    renderCell: (params) => {
      const onClick = (e) => {
        e.stopPropagation(); // don't select this row after clicking

        const api = params.api;
        const thisRow = {};

        api
          .getAllColumns()
          .filter((c) => c.field !== "__check__" && !!c)
          .forEach(
            (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
          );

        return alert(JSON.stringify(thisRow, null, 4));
      };

      return <Button onClick={onClick}>Edit</Button>;
    },
  },
];

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const loading = useSelector((state) => state.note.loading);
  const err = useSelector((state) => state.note.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getNotes());
      // ...
    };
    fetchData();
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
