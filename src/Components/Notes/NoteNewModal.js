import React from 'react'
import ModalWrapper from '../../Libs/ModalWrapper'
import NoteNew from './NoteNew'

const NoteNewModal = (props) => {
  return (
  <ModalWrapper size="lg" header="Note New">
    <NoteNew/>
  </ModalWrapper>
  )
}

export default NoteNewModal