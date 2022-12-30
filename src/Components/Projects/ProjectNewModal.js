import React from 'react'
import ModalWrapper from '../../Libs/ModalWrapper'
import ProjectNew from './ProjectNew'

const ProjectNewModal = (props) => {
  return (
  <ModalWrapper size="lg" header="Project New">
    <ProjectNew/>
  </ModalWrapper>
  )
}

export default ProjectNewModal