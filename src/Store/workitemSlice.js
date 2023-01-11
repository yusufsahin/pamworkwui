import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Libs/TaskmanApi";

const initialState = {
  workitems: [],
  workitem: {},
  currentWorkitem: {},
  loading: true,
  err: {},
};
export const changeWorkitem = createAsyncThunk(
  "/workitems/changeWorkitem",
  async (data, thunkApi) => {
    try {
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const saveTaskToWorkitem = createAsyncThunk(
  "/workitems/saveTaskToWorkitem",
  async (data, thunkApi) => {
    try {
      console.log("/workitems/saveTaskToWorkitem");
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const updateTaskToWorkitem = createAsyncThunk(
  "/workitems/updateTaskToWorkitem",
  async (data, thunkApi) => {
    try {
      console.log("/workitems/saveTaskToWorkitem");
      console.log(data);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);

export const getWorkitems = createAsyncThunk(
  "/workitems/getWorkitems",
  async (project, thunkApi) => {
    try {
      let url = "/workitems";

      if (project !== null) {
        url = `/workitems?projectId=${project.id}`;
      }

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const saveWorkitem = createAsyncThunk(
  "/workitems/saveWorkitem",

  async (data, thunkApi) => {
    try {
      const response = await axios.post("/workitems", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateWorkitem = createAsyncThunk(
  "/workitems/updateWorkitem",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/workitems/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteWorkitem = createAsyncThunk(
  "/workitems/deleteWorkitem",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/workitems/${data.id}`);
      response.data = {
        ...data,
        id: data.id,
      };
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const workitemSlice = createSlice({
  name: "workitem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeWorkitem.fulfilled, (state, action) => {
      state.currentWorkitem = action.payload;
    });
    builder.addCase(saveTaskToWorkitem.fulfilled, (state, action) => {
      console.log("saveTaskToWorkitem.fulfilled");
      console.log(action.payload);
      if (state.workitems.find((w) => w.id === action.payload.workitemId)) {
        state.workitems.find((w) => w.id === action.payload.workitemId).tasks =
          [
            ...state.workitems.find((w) => w.id === action.payload.workitemId)
              .tasks,
            action.payload,
          ];
      }
    });
    builder.addCase(updateTaskToWorkitem.fulfilled, (state, action) => {
      console.log("updateTaskToWorkitem.fulfilled");
      const taskToUpdate = Object.assign({}, action.payload);
      console.log(taskToUpdate);
      const workitem = state.workitems.find((w) => w.id === taskToUpdate.workitemId);
      if (workitem) {
        const task = workitem.tasks.find((task) => task.id === taskToUpdate.id);
        if (task) {
          state.workitems
            .find((w) => w.id === taskToUpdate.workitemId)
            .tasks.map((item) =>
              item.id === taskToUpdate.id ? taskToUpdate : item
            );
        }
      }
    });

    builder.addCase(getWorkitems.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getWorkitems.fulfilled, (state, action) => {
      state.workitems = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getWorkitems.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });

    builder.addCase(saveWorkitem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveWorkitem.fulfilled, (state, action) => {
      state.workitems = [...state.workitems, action.payload];
      state.loading = false;
      state.currentWorkitem = action.payload;
      state.workitem = action.payload;
      state.err = "";
    });

    builder.addCase(saveWorkitem.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(updateWorkitem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateWorkitem.fulfilled, (state, action) => {
      const payloadData = action.payload;
      state.workitems = state.workitems.map((item) =>
        item.id === payloadData.id ? payloadData : item
      );
      state.loading = false;
      state.currentWorkitem = payloadData;
      state.workitem = payloadData;
      state.err = "";
    });

    builder.addCase(updateWorkitem.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on updating Data.";
    });

    builder.addCase(deleteWorkitem.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteWorkitem.fulfilled, (state, action) => {
      state.workitems = state.workitems.filter(
        (item) => item.id !== action.payload.id
      );
      state.loading = false;
      if (state.currentWorkitem.id === action.payload.id) {
        state.currentWorkitem = {};
      }
      if (state.workitem.id === action.payload.id) {
        state.workitem = {};
      }
      state.err = "";
    });

    builder.addCase(deleteWorkitem.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on Deleting Data.";
    });
  },
});

export default workitemSlice.reducer;
