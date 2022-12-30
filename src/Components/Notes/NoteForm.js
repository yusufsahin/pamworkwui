import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactQuillToolBar from "../../Libs/ReactQuillToolBar";

const NoteForm = ({ handleSubmit, control, reset, onSubmit, errors }) => {


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

export default NoteForm;
