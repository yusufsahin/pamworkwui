import React from 'react'
import ModalWrapper from '../../Libs/ModalWrapper'
import TaskNew from './TaskNew'

const TaskNewModal = (props) => {
  return (
  <ModalWrapper size="lg" header="Task New">
    <TaskNew currentWorkitem={props.currentWorkitem}/>
  </ModalWrapper>
  )
}

export default TaskNewModal