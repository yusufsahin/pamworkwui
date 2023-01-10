import React, { useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {
  getWorkitems,
  changeWorkitem,
  deleteWorkitem,
} from "../../Store/workitemSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";
import { Parser } from "html-to-react";
import { getUsers } from "../../Store/userSlice";
import TaskCard from "../Tasks/TaskCard";

const WorkitemCard = ({ currentProject }) => {
  const dispatch = useDispatch();
  const workitems = useSelector((state) => state.workitem.workitems);
  const loading = useSelector((state) => state.workitem.loading);

  const err = useSelector((state) => state.workitem.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getWorkitems(currentProject));
      dispatch(getUsers());
      // ...
    };
    fetchData();
  }, [currentProject]);

  const handleEdit = async (record) => {
    console.log(record);
    await dispatch(changeWorkitem(record)).then(
      dispatch(
        openModal({
          modalType: "WorkitemEditModal",
          modalProps: { title: "Edit Workitem" },
        })
      )
    );
  };

  const handleDelete = (workitem) => {
    dispatch(changeWorkitem(workitem)).then(
      dispatch(
        openModal({
          modalType: "WorkitemDeleteModal",
          modalProps: { title: "Delete Workitem" },
        })
      )
    );
  };
  return loading === true ? (
    <CircularProgress />
  ) : currentProject === null ? (
    <p>Select a Project please</p>
  ) : (
    <div style={{ height: 400, width: "100%" }}>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(openModal({ modalType: "WorkitemNewModal", modalProps: {} }))
        }
        sx={{
          marginBottom: 2,
        }}
      >
        New
      </Button>

      {workitems.map((workitem) => {
        return (
          <Accordion key={workitem.id}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={workitem.id}
            >
              <Typography>{workitem.name}</Typography>
              <Button variant="contained" onClick={()=>handleEdit(workitem)}>Edit</Button>
              <Button
                variant="contained"
                onClick={() =>dispatch(changeWorkitem(workitem)).then(
                  dispatch(
                    openModal({
                      modalType: "TaskNewModal",
                      modalProps: {},
                    })
                  ))
                }
                sx={{
                  marginBottom: 2,
                }}
              >
                New Task
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{workitem.description}</Typography>
              {
                workitem.tasks ? 
                workitem.tasks.map((task) => {
                  return (
                    <>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id={task.id}
                        >
                          <Typography>{task.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{task.description}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  );
                })
                :
                <></>
              }
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default WorkitemCard;
