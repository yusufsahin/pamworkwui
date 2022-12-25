import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Libs/TaskmanApi";

const initialState = {
  notes: [],
  note: {},
  currentNote: {},
  loading: true,
  err: {},
};

export const getNotes = createAsyncThunk(
  "/notes/getNotes",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/notes");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.loading=false;
      state.err="";
    });

    builder.addCase(getNotes.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
  },
});

export default noteSlice.reducer;
