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
import { getProjects, changeProject, deleteProject } from "../../Store/projectSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";
import { Parser } from 'html-to-react'
import { getUsers } from "../../Store/userSlice";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);
  const currentProject = useSelector((state) => state.project.currentProject)
  const err = useSelector((state) => state.project.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getProjects());
      dispatch(getUsers())
      // ...
    };
    fetchData();
  }, [currentProject]);

const handleEdit=async (record)=>{
  console.log(record);
  await dispatch(changeProject(record)).then(dispatch(openModal({modalType:'ProjectEditModal', modalProps:{title: 'Edit Project'}})));
}

const handleDelete=(project)=>{
  dispatch(changeProject(project)).then(dispatch(openModal({modalType:'ProjectDeleteModal', modalProps:{title: 'Delete Project'}})));
}
  return loading === true ? (
    <CircularProgress />
  ) : (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(openModal({ modalType: "ProjectNewModal", modalProps: {} }))
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
          {projects.map((project) => (
            <TableRow
              key={project.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {project.id}
              </TableCell>
              <TableCell >{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{Parser().parse(project.memo)}</TableCell>
              <TableCell ><Button variant="contained" onClick={()=>handleEdit(project)}>E</Button></TableCell>
              <TableCell ><Button variant="outlined" onClick={()=>handleDelete(project)}>D</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default ProjectList;
