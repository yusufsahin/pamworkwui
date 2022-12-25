import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Libs/TaskmanApi";
import { login } from "./securitySlice";

const initialState = {
  projects: [],
  project: {},
  currentProject: {},
  loading: true,
  err: {},
};

export const changeProject = createAsyncThunk(
  "/projects/changeProject",
  async (data, thunkApi) => {
    try {
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const getProjects = createAsyncThunk(
  "/projects/getProjects",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/projects");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeProject.fulfilled, (state, action) => {
      state.currentProject = action.payload;
    });

    builder.addCase(getProjects.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProjects.fulfilled, (state, action) => {
      state.projects = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getProjects.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });
  },
});

export default projectSlice.reducer;
