import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Libs/TaskmanApi";

const initialState = {
  tasks: [],
  task: {},
  currentTask: {},
  loading: true,
  err: {},
};
export const changeTask = createAsyncThunk(
  "/tasks/changeTask",
  async (data, thunkApi) => {
    try {
      
      
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const getTasks = createAsyncThunk(
  "/tasks/getTasks",
  async (workitem, thunkApi) => {
    console.log(workitem);
    try {
      let url='/tasks';

    if(workitem!==null)
    {
       url=`/tasks?workitemId=${workitem.id}`;

    }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const saveTask = createAsyncThunk(
  "/tasks/saveTask",
 
  async (data, thunkApi) => {
    try { 
      const response = await axios.post("/tasks", data);
      console.log(response)
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateTask = createAsyncThunk(
  "/tasks/updateTask",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/tasks/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "/tasks/deleteTask",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/tasks/${data.id}`);
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

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeTask.fulfilled, (state, action) => {
      state.currentTask = action.payload;
    });

    builder.addCase(getTasks.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getTasks.fulfilled, (state, action) => {
      const data =Object.assign({}, action.payload);
      state.tasks = [...state.tasks.filter((t) => t.workitemid!==data[0].workitemid),...action.payload];
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getTasks.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });

    builder.addCase(saveTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveTask.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload];
      state.loading = false;
      state.currentTask = action.payload;
      state.task = action.payload;
      state.err = "";
    });

    builder.addCase(saveTask.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(updateTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateTask.fulfilled, (state, action) => {
      const payloadData = action.payload;
      state.tasks = state.tasks.map((item) => (item.id === payloadData.id ? payloadData : item));
      state.loading = false;
      state.currentTask = payloadData;
      state.task = payloadData;
      state.err = "";
    });

    builder.addCase(updateTask.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on updating Data.";
    });

    builder.addCase(deleteTask.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter((item) => (item.id !== action.payload.id))
      state.loading = false;
      if(state.currentTask.id === action.payload.id){
        state.currentTask = {};
      }
      if(state.task.id === action.payload.id){
        state.task = {};
      }
      state.err = "";
    });

    builder.addCase(deleteTask.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on Deleting Data.";
    });
  },
});

export default taskSlice.reducer;
