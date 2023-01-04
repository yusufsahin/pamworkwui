import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkitemList from '../Workitems/WorkitemList';
import WorkitemCard from '../Workitems/WorkitemCard';


const ProjectCard = ({currentProject}) => {
  return (
    <div>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{currentProject.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
         {currentProject.description}
        </Typography>
      </AccordionDetails>
      <WorkitemCard currentProject={currentProject}/>
    </Accordion>
   
  </div>
  )
}

export default ProjectCard