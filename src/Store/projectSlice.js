import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Libs/TaskmanApi";

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
export const saveProject = createAsyncThunk(
  "/projects/saveProject",
 
  async (data, thunkApi) => {
    try { 
      console.log(data.memo)
      const response = await axios.post("/projects", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateProject = createAsyncThunk(
  "/projects/updateProject",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/projects/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "/projects/deleteProject",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/projects/${data.id}`);
      response.data = {
        ...data,
        id: data.id
      }
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

    builder.addCase(saveProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveProject.fulfilled, (state, action) => {
      state.projects = [...state.projects, action.payload];
      state.loading = false;
      state.currentProject = action.payload;
      state.project = action.payload;
      state.err = "";
    });

    builder.addCase(saveProject.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(updateProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProject.fulfilled, (state, action) => {
      const payloadData = action.payload;
      state.projects = [...state.projects,
        state.projects.map((item) => (item.id === payloadData.id ? payloadData : item)),
      ];
      state.loading = false;
      state.currentProject = payloadData;
      state.project = payloadData;
      state.err = "";
    });

    builder.addCase(updateProject.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on updating Data.";
    });

    builder.addCase(deleteProject.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProject.fulfilled, (state, action) => {
      state.projects = state.projects.filter((item) => (item.id !== action.payload.id))
      state.loading = false;
      if(state.currentProject.id === action.payload.id){
        state.currentProject = {};
      }
      if(state.project.id === action.payload.id){
        state.project = {};
      }
      state.err = "";
    });

    builder.addCase(deleteProject.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on Deleting Data.";
    });
  },
});

export default projectSlice.reducer;
