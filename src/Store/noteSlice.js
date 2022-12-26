import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Libs/TaskmanApi";

const initialState = {
  notes: [],
  note: {},
  currentNote: {},
  loading: true,
  err: {},
};
export const changeNote = createAsyncThunk(
  "/notes/changeNote",
  async (data, thunkApi) => {
    try {
      
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
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
export const saveNote = createAsyncThunk(
  "/notes/saveNote",
  async (data, thunkApi) => {
    try {
      const response = await axios.post("/notes", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateNote = createAsyncThunk(
  "/notes/updateNote",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/notes/${data.id}`, data);
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
    builder.addCase(changeNote.fulfilled, (state, action) => {
      state.currentNote = action.payload;
    });

    builder.addCase(getNotes.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.notes = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getNotes.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });

    builder.addCase(saveNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveNote.fulfilled, (state, action) => {
      state.notes = [...state.notes, action.payload];
      state.loading = false;
      state.currentNote = action.payload;
      state.note = action.payload;
      state.err = "";
    });

    builder.addCase(saveNote.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateNote.fulfilled, (state, action) => {
      const payloadData = action.payload;
      state.notes = [...state.notes,
        state.notes.map((item) => (item.id === payloadData.id ? payloadData : item)),
      ];
      state.loading = false;
      state.currentNote = payloadData;
      state.note = payloadData;
      state.err = "";
    });

    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on updating Data.";
    });
  },
});

export default noteSlice.reducer;
