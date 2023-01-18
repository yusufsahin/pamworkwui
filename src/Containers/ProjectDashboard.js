import React from "react";
import ProjectMenu from "../Components/Projects/ProjectMenu";
import WorkitemList from "../Components/Workitems/WorkitemList";
import { useDispatch, useSelector } from "react-redux";
import ProjectDetails from "../Components/Projects/ProjectDetails";
import { Grid } from "@mui/material";
const ProjectDashboard = () => {
  const currentProject = useSelector((state) => state.project.currentProject);

  return (
    <Grid
    container
    direction="row"
    justifyContent="space-evenly"
    alignItems="stretch"
    >
      <Grid item xs={3}>
        <ProjectMenu />
      </Grid>
      <Grid item xs={8}>
        <ProjectDetails currentProject={currentProject} />
      </Grid>
    </Grid>
  );
};

export default ProjectDashboard;
