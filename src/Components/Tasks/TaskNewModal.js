import React from 'react'
import ModalWrapper from '../../Libs/ModalWrapper'
import TaskNew from './TaskNew'

const TaskNewModal = (props) => {
  return (
  <ModalWrapper size="lg" header="Task New">
    <TaskNew/>
  </ModalWrapper>
  )
}

export default TaskNewModal