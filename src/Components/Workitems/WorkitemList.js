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
import { getWorkitems, changeWorkitem, deleteWorkitem } from "../../Store/workitemSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";
import { Parser } from 'html-to-react'
import { getUsers } from "../../Store/userSlice";

const WorkitemList = ({ currentProject }) => {
  const dispatch = useDispatch();
  const workitems = useSelector((state) => state.workitem.workitems);
  const loading = useSelector((state) => state.workitem.loading);

  const err = useSelector((state) => state.workitem.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getWorkitems(currentProject));
      dispatch(getUsers())
      // ...
    };
    fetchData();
  }, [currentProject]);

const handleEdit=async (record)=>{
  console.log(record);
  await dispatch(changeWorkitem(record)).then(dispatch(openModal({modalType:'WorkitemEditModal', modalProps:{title: 'Edit Workitem'}})));
}

const handleDelete=(workitem)=>{
  dispatch(changeWorkitem(workitem)).then(dispatch(openModal({modalType:'WorkitemDeleteModal', modalProps:{title: 'Delete Workitem'}})));
}
  return loading === true ? (
    <CircularProgress />
  ) : (
    currentProject===null?
    <p>Select a Project please</p>
    :
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(openModal({ modalType: "WorkitemNewModal", modalProps: {} }))
        }
        sx={{
          marginBottom:2,
        }}
      >
        New
      </Button>
      <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow key="header">
            <TableCell>Id</TableCell>
            <TableCell >Name</TableCell>
            <TableCell >Description</TableCell>
            <TableCell>Memo</TableCell>
            <TableCell >Edit</TableCell>
            <TableCell >Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workitems.map((workitem) => (
            <TableRow
              key={workitem.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {workitem.id}
              </TableCell>
              <TableCell >{workitem.name}</TableCell>
              <TableCell>{workitem.description}</TableCell>
              <TableCell>{Parser().parse(workitem.memo)}</TableCell>
              <TableCell ><Button variant="contained" onClick={()=>handleEdit(workitem)}>E</Button></TableCell>
              <TableCell ><Button variant="outlined" onClick={()=>handleDelete(workitem)}>D</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default WorkitemList;
