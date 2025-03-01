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
import { Box } from "@mui/material";

import {
  getWorkitems,
  changeWorkitem,
  deleteWorkitem,
} from "../../Store/workitemSlice";
import { changeTask } from "../../Store/taskSlice";
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
    dispatch(getWorkitems(currentProject));
    dispatch(getUsers());
  }, [dispatch,currentProject]);

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
    <div style={{width: "100%" }}>
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
          <Accordion key={workitem.id} sx={{
            marginY:3,
          }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id={workitem.id}
            >
              <Box display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  marginRight:4,
                }}
              >
                <Typography>{workitem.id}</Typography>
                <Typography>{workitem.name}</Typography>
              </Box>
              <Button variant="contained" onClick={() => handleEdit(workitem)} 
              sx={{
                  margin: 2,
                  maxHeight:40,
                }}
              >
                Edit
              </Button>
              <Button variant="outlined" onClick={() => handleDelete(workitem)}                 
              sx={{
                  margin: 2,
                  maxHeight:40,
                }}
              >
                D
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  dispatch(changeWorkitem(workitem)).then(
                    dispatch(
                      openModal({
                        modalType: "TaskNewModal",
                        modalProps: {},
                      })
                    )
                  )
                }
                sx={{
                  margin: 2,
                  maxHeight:40,
                }}
              >
                New Task
              </Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{
                marginBottom:3,
              }}>{workitem.description}</Typography>
              {workitem.tasks ? (
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
                          <Typography sx={{
                            marginBottom:2,
                          }}>{task.description}</Typography>
                          <Button
                            variant="contained"
                            onClick={() =>
                              dispatch(changeTask(task)).then(
                                dispatch(
                                  openModal({
                                    modalType: "TaskEditModal",
                                    modalProps: {},
                                  })
                                )
                              )
                            }
                            sx={{
                              marginBottom: 2,
                              marginRight:2,
                            }}
                          >
                            Edit Task
                          </Button>
                          <Button
                            variant="contained"
                            onClick={() =>
                              dispatch(changeTask(task)).then(
                                dispatch(
                                  openModal({
                                    modalType: "TaskDeleteModal",
                                    modalProps: {},
                                  })
                                )
                              )
                            }
                            sx={{
                              marginBottom: 2,
                            }}
                          >
                            Delete Task
                          </Button>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default WorkitemCard;
