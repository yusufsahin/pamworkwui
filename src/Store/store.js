import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice"
import projectSlice from "./projectSlice";
import modalSlice from "./modalSlice";

export const store = configureStore({
   reducer: {
        security: securitySlice,
        project: projectSlice,
        modal:modalSlice
   }
})