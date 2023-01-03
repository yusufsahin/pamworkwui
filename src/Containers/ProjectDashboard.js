import React from 'react'
import ProjectMenu from '../Components/Projects/ProjectMenu'
import WorkitemList from '../Components/Workitems/WorkitemList'
import { useDispatch, useSelector } from "react-redux";
const ProjectDashboard = () => {
    const currentProject = useSelector((state) => state.project.currentProject);

  return (
    <div>
      <ProjectMenu/>
      <WorkitemList currentProject={currentProject}/>
    </div>
  )
}

export default ProjectDashboard
