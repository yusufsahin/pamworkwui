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
import { updateTask } from "../../Store/taskSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { modules, formats } from "../../Libs/ReactQuillToolBar";
import TaskForm from "./TaskForm";

const schema = yup.object().shape({
  name: yup.string().required(),
});
const TaskEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state) => state.task.currentTask);
  const currentWorkitem = useSelector((state) => state.workitem.currentWorkitem);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      id: task.id,
      name: task.name,
      description: task.description,
      hoursExpected:task.hoursExpected,
      hoursActual:task.hoursActual,
      dueDate:task.dueDate,
      expectedDate: task.expectedDate,
      actualDate:task.actualDate,
      assignTo: task.assignTo,
      type: task.type,
      category:task.category,
      status:task.status,
      workitemId:currentWorkitem.id,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let defaults = {
      id: task.id,
      name: task.name,
      description: task.description,
      point:task.point,
      dueDate:task.dueDate,
      expectedDate: task.expectedDate,
      actualDate:task.actualDate,
      responsibleUser: task.responsibleUser,
      type: task.type,
      category:task.category,
      state:task.state,
      workitemId:currentWorkitem.id,
    };
    reset(defaults);
  }, [task, reset]);

  const onSubmit = async (formProps) => {
    console.log(formProps);
    if (formProps.name) {
      await dispatch(updateTask(formProps)).then(dispatch(closeModal()));
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

export default TaskEdit;
