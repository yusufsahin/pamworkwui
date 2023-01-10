import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import WorkitemCard from "../Workitems/WorkitemCard";

const ProjectDetails = ({ currentProject }) => {
  return currentProject.id ? (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id={currentProject.id}
      >
        <Typography>{`${currentProject.id}-${currentProject.name}`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>{currentProject.description}</Typography>
        <Divider />
        <WorkitemCard currentProject={currentProject} />
      </AccordionDetails>
    </Accordion>
  ) : (
    <p>Select a Project</p>
  );
};

export default ProjectDetails;
