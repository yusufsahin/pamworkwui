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
import { getTasks, changeTask, deleteTask } from "../../Store/taskSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";
import { Parser } from 'html-to-react'
import { getUsers } from "../../Store/userSlice";

const TaskList = ({ currentProject }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const loading = useSelector((state) => state.task.loading);

  const err = useSelector((state) => state.task.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getTasks(currentProject));
      dispatch(getUsers())
      // ...
    };
    fetchData();
  }, [currentProject]);

const handleEdit=async (record)=>{
  console.log(record);
  await dispatch(changeTask(record)).then(dispatch(openModal({modalType:'TaskEditModal', modalProps:{title: 'Edit Task'}})));
}

const handleDelete=(task)=>{
  dispatch(changeTask(task)).then(dispatch(openModal({modalType:'TaskDeleteModal', modalProps:{title: 'Delete Task'}})));
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
          dispatch(openModal({ modalType: "TaskNewModal", modalProps: {} }))
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
          {tasks.map((task) => (
            <TableRow
              key={task.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.id}
              </TableCell>
              <TableCell >{task.name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{Parser().parse(task.memo)}</TableCell>
              <TableCell ><Button variant="contained" onClick={()=>handleEdit(task)}>E</Button></TableCell>
              <TableCell ><Button variant="outlined" onClick={()=>handleDelete(task)}>D</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default TaskList;
