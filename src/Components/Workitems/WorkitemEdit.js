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
import { updateWorkitem } from "../../Store/workitemSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { modules, formats } from "../../Libs/ReactQuillToolBar";
import WorkitemForm from "./WorkitemForm";

const schema = yup.object().shape({
  name: yup.string().required(),
});
const WorkitemEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workitem = useSelector((state) => state.workitem.currentWorkitem);
  const currentProject = useSelector((state) => state.project.currentProject);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      id: workitem.id,
      name: workitem.name,
      description: workitem.description,
      point:workitem.point,
      dueDate:workitem.dueDate,
      expectedDate: workitem.expectedDate,
      actualDate:workitem.actualDate,
      responsibleUser: workitem.responsibleUser,
      type: workitem.type,
      category:workitem.category,
      state:workitem.state,
      projectid:currentProject.id,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let defaults = {
      id: workitem.id,
      name: workitem.name,
      description: workitem.description,
      point:workitem.point,
      dueDate:workitem.dueDate,
      expectedDate: workitem.expectedDate,
      actualDate:workitem.actualDate,
      responsibleUser: workitem.responsibleUser,
      type: workitem.type,
      category:workitem.category,
      state:workitem.state,
      projectid:currentProject.id,
    };
    reset(defaults);
  }, [workitem, reset]);

  const onSubmit = async (formProps) => {
    console.log(formProps);
    if (formProps.name) {
      await dispatch(updateWorkitem(formProps)).then(dispatch(closeModal()));
      // console.log(formProps);
    }
  };

  return (
    <div>
      <Box sx={{ mt: 1 }}>
      <WorkitemForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} reset={reset} errors={errors}/>
      </Box>
    </div>
  );
};

export default WorkitemEdit;
