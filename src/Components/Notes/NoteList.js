import React, { useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { getNotes, changeNote, deleteNote } from "../../Store/noteSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";
import { Parser } from 'html-to-react'

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  const loading = useSelector((state) => state.note.loading);
  const currentNote = useSelector((state) => state.note.currentNote)
  const err = useSelector((state) => state.note.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getNotes());
      // ...
    };
    fetchData();
  }, [currentNote]);

const handleEdit=(record)=>{
  console.log(record);
  dispatch(changeNote(record)).then(dispatch(openModal({modalType:'NoteEditModal', modalProps:{title: 'Edit Note'}})));
}

const handleDelete=(note)=>{
  dispatch(changeNote(note)).then(dispatch(openModal({modalType:'NoteDeleteModal', modalProps:{title: 'Delete Note'}})));
}
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
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Description</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell >Edit</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes.map((note) => (
            <TableRow
              key={note.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {note.id}
              </TableCell>
              <TableCell >{note.name}</TableCell>
              <TableCell>{note.description}</TableCell>
              <TableCell>{Parser().parse(note.memo)}</TableCell>
              <TableCell ><Button variant="contained" onClick={()=>handleEdit(note)}>E</Button></TableCell>
              <TableCell ><Button variant="outlined" onClick={()=>handleDelete(note)}>D</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default NoteList;
