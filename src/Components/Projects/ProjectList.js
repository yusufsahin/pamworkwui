import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { getProjects } from "../../Store/projectSlice";

const ProjectList = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);
  const err = useSelector((state) => state.project.err);
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return loading === true ? (
    <CircularProgress />
  ) : (
    <Grid container spacing={3}>
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
                </CardContent>
              </Card>
            </Grid>
          );
        })
      ) : err === '' ? (
        <Alert severity="info">No Data to display</Alert>
      ) : (
        <Alert severity="warning">Error on Getting Data!</Alert>
      )}
    </Grid>
  );
};

export default ProjectList;
