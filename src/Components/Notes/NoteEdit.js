import React, { useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Login from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../Store/modalSlice";
import { updateNote } from "../../Store/noteSlice";

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

  const onSubmit = async (formProps) => {
    const { name, desccription, memo } = formProps;
    console.log("----Update Form Start-----");
    console.log(formProps);
    console.log("----Update Form Finish-----");
    if (name) {
      await dispatch(updateNote(formProps)).then(dispatch(closeModal()));
      //console.log(formProps);
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
              <TextField
                {...field}
                label="Memo"
                rows={8}
                variant="filled"
                fullWidth
                error={"memo" in errors}
                helperText={errors.memo?.message}
              />
            )}
          />
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
          
        </form>
      </Box>
    </div>
  );
};

export default NoteEdit;
