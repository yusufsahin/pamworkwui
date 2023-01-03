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
import { saveWorkitem } from "../../Store/workitemSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../Libs/ReactQuillToolBar";
import WorkitemForm from "./WorkitemForm";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const WorkitemNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentProject= useSelector((state) => state.project.currentProject);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      point: null,
      dueDate:null,
      expectedDate: null,
      actualDate:null,
      responsibleUser: null,
      type: null,
      category:null,
      state:null,
      projectid:currentProject.id,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formProps) => {
    console.log(formProps)
    if (formProps.name) {
      await dispatch(saveWorkitem(formProps)).then(dispatch(closeModal()));
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

export default WorkitemNew;
