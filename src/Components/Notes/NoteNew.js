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
import { saveNote } from "../../Store/noteSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { modules, formats } from "../../Libs/ReactQuillToolBar";
import NoteForm from "./NoteForm";

const schema = yup.object().shape({
  name: yup.string().required(),
});

const NoteNew = () => {
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
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formProps) => {

    if (formProps.name) {
      await dispatch(saveNote(formProps)).then(dispatch(closeModal()));
      // console.log(formProps);
    }
  };

  return (
    <div>
      <Box sx={{ mt: 1 }}>
       <NoteForm control={control} handleSubmit={handleSubmit} onSubmit={onSubmit} reset={reset} errors={errors}/>
      </Box>
    </div>
  );
};

export default NoteNew;
