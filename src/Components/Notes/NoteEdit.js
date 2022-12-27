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
import { EditorState, ContentState,convertToRaw } from 'draft-js';

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


const schema = yup.object().shape({
  name: yup.string().required(),
});
const NoteEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const note = useSelector((state) => state.note.currentNote);
  const blocksFromHtml = htmlToDraft(note.memo);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
  const editorState = EditorState.createWithContent(contentState);
  console.log(editorState);

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
      memo: editorState,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    let defaults= {
      id: note.id,
      name: note.name,
      description: note.description,
      memo: editorState
    }
    reset(defaults)
  }, [note, reset])

  const onSubmit = async (formProps) => {
    const content = draftToHtml(convertToRaw(formProps.memo.getCurrentContent()));
    const data = {
      id:formProps.id,
      name:formProps.name,
      description:formProps.description,
      memo:content
    }

    console.log(data);
    if (formProps.name) {
      await dispatch(updateNote(data)).then(dispatch(closeModal()));
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
            render={({ field }) => {
              return (
                <Editor
                  editorStyle={{
                    padding: "0px 10px 10px",
                    height: "200px",
                  }}
                  editorState={field.value}
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  onEditorStateChange={field.onChange}
                />
              );
            }}
          />
          <Button variant="contained" type="submit">Submit</Button>
          
        </form>
      </Box>
    </div>
  );
};

export default NoteEdit;
