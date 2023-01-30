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
    columnSpacing={{
      xs:2,
    }}
    >
      <Grid item xs={3}>
        <ProjectMenu />
      </Grid>
      <Grid item xs={9}>
        <ProjectDetails currentProject={currentProject} />
      </Grid>
    </Grid>
  );
};

export default ProjectDashboard;
