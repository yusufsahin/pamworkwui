import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../Libs/TaskmanApi";



const initialState = {
  isAuthenticated: false,
  isRegistered:false,
  token: "",
  refreshToken:"",
  user: {},
  err:""
  };


export const login = createAsyncThunk(
  "auth/login",
  async (loginCred, thunkApi) => {
    try{
      const response = await axios.post(`/auth/login`,loginCred);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('refreshToken', response.data.refreshToken);

      return response.data;
    }
    catch(error){
      return thunkApi.rejectWithValue(error.response?.data)
    }

  }
)

export const register = createAsyncThunk(
  "auth/register",
  async (registerCred, thunkApi) => {
    try{
      const response = await axios.post(`/auth/register`,registerCred);
      return response.data;
    }
    catch(error){
      console.log(error)
      return thunkApi.rejectWithValue(error.response?.data)
    }

  }
)
  
export const securitySlice =  createSlice({
    name:"security",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
        state.loading = true;
      });
        builder.addCase(login.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.refreshToken = action.payload.refreshToken;
          state.err="";
        })
        builder.addCase(login.rejected, (state, action) => {
          state.isAuthenticated = false;
          state.username = "";
          state.token = "";
          state.err="Invalid Credentials"
        })
        builder.addCase(register.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;
          state.isRegistered = true;
          state.err="";

        })
        builder.addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.err="Username or Email existed."

        })
    }
})


export default securitySlice.reducer;
