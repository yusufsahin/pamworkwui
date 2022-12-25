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
import { login } from "../../Store/securitySlice";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../Store/modalSlice";

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
      memo: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formProps) => {
    const { name, desccription, memo } = formProps;
    if (name) {
      console.log(formProps);
      dispatch(closeModal());
      // await dispatch(saveNote(formProps));
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
          <Button type="submit" variant="contained">
            OK
          </Button>
          <Button
            onClick={() =>
              reset({
                name: "",
                desccription: "",
                memo: "",
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
