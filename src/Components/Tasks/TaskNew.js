import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { closeModal } from "../../Store/modalSlice";
import { saveTask } from "../../Store/taskSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../Libs/ReactQuillToolBar";
import TaskForm from "./TaskForm";
import { getWorkitems } from "../../Store/workitemSlice";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const TaskNew =() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentWorkitem= useSelector((state) => state.workitem.currentWorkitem);
  const currentProject = useSelector(state => state.project.currentProject);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      hoursExpected:null,
      hoursActual:null,
      dueDate:null,
      expectedDate: null,
      actualDate:null,
      assignTo: null,
      type: null,
      category:null,
      status:null,
      workitemId:currentWorkitem.id,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formProps) => {
    formProps.workitemId = currentWorkitem.id;
    console.log(currentWorkitem.id);
    console.log(formProps)
    if (formProps.name) {
      await dispatch(saveTask(formProps)).then(dispatch(closeModal())).then(dispatch(getWorkitems(currentProject)));
      // console.log(formProps);
    }
  };

  return (
    <div>
      <Box sx={{ mt: 1 }}>
       <TaskForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} reset={reset} errors={errors}/>
      </Box>
    </div>
  );
};

export default TaskNew;
