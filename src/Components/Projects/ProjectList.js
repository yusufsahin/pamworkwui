import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { changeProject, getProjects } from "../../Store/projectSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);
  const err = useSelector((state) => state.project.err);
  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getProjects());
      // ...
    };
    fetchData();
  }, []);

  return loading === true ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={3}>
      <Button
        variant="contained"
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: {} }))
        }
      >
        Modal
      </Button>
      {projects.length > 0 ? (
        projects.map((project) => {
          return (
            <Grid item xs={4}>
              <Card id={project.id}>
                <CardContent>
                  <Typography>{project.name}</Typography>
                  <Typography>{project.description}</Typography>
                  <Typography>
                    {project.projectManager} - {project.projectAssistant}
                  </Typography>
                  <Typography>Status: {project.status}</Typography>
                  <Button
                    ariant="contained"
                    onClick={ () =>dispatch(changeProject(project))}
                  >
                    Edit
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })
      ) : err === "" ? (
        <Alert severity="info">No Data to display</Alert>
      ) : (
        <Alert severity="warning">Error on Getting Data!</Alert>
      )}
    </Grid>
  );
};

export default ProjectList;
