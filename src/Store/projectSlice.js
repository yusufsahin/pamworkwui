import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../Libs/TaskmanApi"
import { login } from "./securitySlice";


const initialState = {
    projectList : []
}

export const getAllProjects = createAsyncThunk(
    '/projects/getAllProjects', async (_, thunkApi) => {
        try{
            const response = await axios.get("/projects");
            return response.data
        }
        catch(error){
            return thunkApi.rejectWithValue(error.response?.data)
        }            
    } 
)

export const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProjects.fulfilled, (state, action) => {
            state.projectList = action.payload;
        })
    }
})

export default projectSlice.reducer;