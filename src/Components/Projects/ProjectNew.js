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
import { saveProject } from "../../Store/projectSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../Libs/ReactQuillToolBar";
import ProjectForm from "./ProjectForm";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const ProjectNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      memo: null,
      projectManager: "",
      projectAssistant: "",
      status: "Initation"
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formProps) => {
    if (formProps.name) {
      await dispatch(saveProject(formProps)).then(dispatch(closeModal()));
      // console.log(formProps);
    }
  };

  return (
    <div>
      <Box sx={{ mt: 1 }}>
       <ProjectForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} reset={reset} errors={errors}/>
      </Box>
    </div>
  );
};

export default ProjectNew;
