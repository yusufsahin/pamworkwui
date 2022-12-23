import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice"
import projectSlice from "./projectSlice";

export const store = configureStore({
   reducer: {
        security: securitySlice,
        project: projectSlice,
   }
})