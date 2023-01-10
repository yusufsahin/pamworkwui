import React from "react";
import ProjectMenu from "../Components/Projects/ProjectMenu";
import WorkitemList from "../Components/Workitems/WorkitemList";
import { useDispatch, useSelector } from "react-redux";
import ProjectDetails from "../Components/Projects/ProjectDetails";
import { Grid } from "@mui/material";
const ProjectDashboard = () => {
  const currentProject = useSelector((state) => state.project.currentProject);

  return (
    <Grid container>
      <Grid item xs={12} sm={4}>
        <ProjectMenu />
      </Grid>
      <Grid item xs={24} sm={8}>
        <ProjectDetails currentProject={currentProject} />
      </Grid>
    </Grid>
  );
};

export default ProjectDashboard;
