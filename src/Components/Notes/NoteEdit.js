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
import { updateNote } from "../../Store/noteSlice";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { modules, formats } from "../../Libs/ReactQuillToolBar";

const schema = yup.object().shape({
  name: yup.string().required(),
});
const NoteEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const note = useSelector((state) => state.note.currentNote);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      id: note.id,
      name: note.name,
      description: note.description,
      memo: note.memo,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let defaults = {
      id: note.id,
      name: note.name,
      description: note.description,
      memo: note.memo,
    };
    reset(defaults);
  }, [note, reset]);

  const onSubmit = async (formProps) => {
    console.log(formProps);
    if (formProps.name) {
      await dispatch(updateNote(formProps)).then(dispatch(closeModal()));
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
                helperText={errors.description?.message}
              />
            )}
          />
          <Controller
            name="memo"
            control={control}
            modules={modules}
            formats={formats}
            theme="snow"
            render={({ field }) => (
              <ReactQuill
                {...field}
                placeholder={"Write Memo"}
                onChange={(text) => {
                  field.onChange(text);
                }}
              />
            )}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default NoteEdit;
