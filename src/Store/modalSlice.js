import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: null,
  reducers: {
    openModal: (state, action) => {
      return { modalType: action.payload.modalType, modalProps: action.payload.modalProps };
    },
    closeModal: () => {
      return null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
