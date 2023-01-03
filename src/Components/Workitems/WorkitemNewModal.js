import React from 'react'
import ModalWrapper from '../../Libs/ModalWrapper'
import WorkitemNew from './WorkitemNew'

const WorkitemNewModal = (props) => {
  return (
  <ModalWrapper size="lg" header="Workitem New">
    <WorkitemNew/>
  </ModalWrapper>
  )
}

export default WorkitemNewModal