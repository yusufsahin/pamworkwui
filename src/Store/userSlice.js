import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Libs/TaskmanApi";

const initialState = {
  users: [],
  user: {},
  currentUser: {},
  loading: true,
  err: {},
};
export const changeUser = createAsyncThunk(
  "/users/changeUser",
  async (data, thunkApi) => {
    try {
      
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(data);
    }
  }
);
export const getUsers = createAsyncThunk(
  "/users/getUsers",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const saveUser = createAsyncThunk(
  "/users/saveUser",
 
  async (data, thunkApi) => {
    try { 
      console.log(data.memo)
      const response = await axios.post("/users", data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);
export const updateUser = createAsyncThunk(
  "/users/updateUser",
  async (data, thunkApi) => {
    try {
      const response = await axios.put(`/users/${data.id}`, data);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "/users/deleteUser",
  async (data, thunkApi) => {
    try {
      const response = await axios.delete(`/users/${data.id}`);
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(changeUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });

    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
      state.err = "";
    });

    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on getting Data.";
    });

    builder.addCase(saveUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(saveUser.fulfilled, (state, action) => {
      state.users = [...state.users, action.payload];
      state.loading = false;
      state.currentUser = action.payload;
      state.user = action.payload;
      state.err = "";
    });

    builder.addCase(saveUser.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on saving Data.";
    });
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      const payloadData = action.payload;
      state.users = [...state.users,
        state.users.map((item) => (item.id === payloadData.id ? payloadData : item)),
      ];
      state.loading = false;
      state.currentUser = payloadData;
      state.user = payloadData;
      state.err = "";
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on updating Data.";
    });

    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((item) => (item.id !== action.payload.id))
      state.loading = false;
      if(state.currentUser.id === action.payload.id){
        state.currentUser = {};
      }
      if(state.user.id === action.payload.id){
        state.user = {};
      }
      state.err = "";
    });

    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.err = "Problem on Deleting Data.";
    });
  },
});

export default userSlice.reducer;