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
import ReactQuillToolBar,{ modules, formats } from "../../Libs/ReactQuillToolBar";

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
    //const content = draftToHtml(convertToRaw(formProps.memo.getCurrentContent()));
    //const data = {
    //  name:formProps.name,
    //  description:formProps.description,
    //  memo:content
    //}

    console.log(formProps);
    if (formProps.name) {
      await dispatch(saveNote(formProps)).then(dispatch(closeModal()));
      // console.log(formProps);
    }
  };


  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                rows={8}
                variant="filled"
                fullWidth
                error={"name" in errors}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                rows={8}
                variant="filled"
                fullWidth
                error={"description" in errors}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="memo"
            control={control}
            render={({ field }) => (
              <ReactQuillToolBar
                {...field}
                placeholder={"Write Memo"}
                onChange={(text) => {
                  field.onChange(text);
                }}
              />
            )}
          />

          <Button type="submit" variant="contained">
            OK
          </Button>
          <Button
            onClick={() =>
              reset({
                name: "",
                desccription: "",
                memo: null,
              })
            }
            variant="outlined"
          >
            Reset
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default NoteNew;
