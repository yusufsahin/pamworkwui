import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useForm, Controller } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactQuillToolBar from "../../Libs/ReactQuillToolBar";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const statusArray = ["Initation", "Planning", "Execution", "Monitor", "Closed"];

const ProjectForm = ({ handleSubmit, control, reset, onSubmit, errors }) => {
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    console.log(users);
  });
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
            name="scope"
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
          <Controller
            name="projectManager"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Project Manager
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Project Manager"
                  value={field.value}
                >
                  {users.map((user) => {
                    return (
                      <MenuItem value={user.username}>{user.username}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="projectAssistant"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Project Assistant
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Project Assistant"
                  value={field.value}
                >
                  {users.map((user) => {
                    return (
                      <MenuItem value={user.username}>{user.username}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Project Status
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Project Status"
                  value={field.value}
                >
                  {statusArray.map((status) => {
                    return <MenuItem value={status}>{status}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Start Date"
                rows={8}
                variant="filled"
                fullWidth
                error={"startDate" in errors}
                helperText={errors.startDate?.message}
              />
            )}
          />
          <Controller
            name="finishDate"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Finish Date"
                rows={8}
                variant="filled"
                fullWidth
                error={"finishDate" in errors}
                helperText={errors.finishDate?.message}
              />
            )}
          />
          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default ProjectForm;
