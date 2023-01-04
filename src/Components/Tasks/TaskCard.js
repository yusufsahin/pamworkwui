import React, { useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { getTasks, changeTask, deleteTask } from "../../Store/taskSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";
import { Parser } from 'html-to-react'
import { getUsers } from "../../Store/userSlice";

const TaskCard = ({ currentWorkitem }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks).filter(t =>t.workitemid===currentWorkitem.id);
  const loading = useSelector((state) => state.task.loading);

  const err = useSelector((state) => state.task.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getTasks(currentWorkitem));
      // ...
    };
    fetchData();
  }, [currentWorkitem]);

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
    currentWorkitem===null?
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
      
          {tasks.map((task) => (
              <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{task.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                {task.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
      
    </div>
  );
};

export default TaskCard;
