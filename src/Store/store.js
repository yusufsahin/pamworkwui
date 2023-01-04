import { configureStore } from "@reduxjs/toolkit";
import securitySlice from "./securitySlice";
import projectSlice from "./projectSlice";
import modalSlice from "./modalSlice";
import noteSlice from "./noteSlice";
import userSlice from "./userSlice";
import workitemSlice from "./workitemSlice";
import taskSlice from "./taskSlice";

export const store = configureStore({
  reducer: {
    security: securitySlice,
    project: projectSlice,
    note: noteSlice,
    modal: modalSlice,
    user: userSlice,
    workitem:workitemSlice,
    task:taskSlice
  },
});
