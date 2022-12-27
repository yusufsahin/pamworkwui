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
import { EditorState, ContentState, convertToRaw } from "draft-js";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { stripHtml } from "string-strip-html";
import WYSIWYGEditor from "../../Libs/WYSIWYGEditor";

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
            render={({ field }) => <WYSIWYGEditor {...field} />}
            name="memo"
            control={control}
            defaultValue=""
            rules={{
              validate: {
                required: (v) =>
                  (v && stripHtml(v).result.length > 0) ||
                  "Memo is required",
                maxLength: (v) =>
                  (v && stripHtml(v).result.length <= 100000000) ||
                  "Maximum character limit is 2000",
              },
            }}
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
