import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProjects } from '../../Store/projectSlice'

const ProjectList = () => {
  const dispatch = useDispatch();
  const projectList = useSelector(
    (state) => state.project.projectList
  )
  
  useEffect(() => {
    dispatch(getAllProjects())
  }, [])

  return (
    <Grid container spacing={3}>
      {
        projectList.length > 0 ? 
        projectList.map((project) => {
          return (<Grid item xs={4}> 
            <Card>
              <CardContent>
                <Typography>
                  {project.name}
                </Typography>
                <Typography>
                  {project.description}
                </Typography>
                <Typography>
                  {project.projectManager} - {project.projectAssistant}
                </Typography>
                <Typography>
                  Status: {project.status}
                </Typography>
              </CardContent>
            </Card>
          </Grid>)
        })
        :
        <></>
      }
    </Grid>
  )
}

export default ProjectList