import React from 'react'
import ProjectMenu from '../Components/Projects/ProjectMenu'
import WorkitemList from '../Components/Workitems/WorkitemList'
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from '../Components/Projects/ProjectCard';
const ProjectDashboard = () => {
    const currentProject = useSelector((state) => state.project.currentProject);

  return (
    <div>
      <ProjectMenu/>
      <ProjectCard currentProject={currentProject}/>
     
    </div>
  )
}

export default ProjectDashboard
