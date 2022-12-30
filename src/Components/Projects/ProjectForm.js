import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useForm, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuillToolBar from "../../Libs/ReactQuillToolBar";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {format} from 'date-fns';


const statusArray = ["Initation", "Planning", "Execution", "Monitor", "Closed"];

const ProjectForm = ({ handleSubmit, control, reset, onSubmit, errors }) => {
  const users = useSelector((state) => state.user.users);

  return (
    <div>
      <Box sx={{ mt: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                sx={{marginBottom:2}}
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
                sx={{marginBottom:2}}
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
              <FormControl fullWidth sx={{marginBottom:2, marginTop:2}}>
                <InputLabel id="demo-simple-select-label">
                  Project Manager
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={field.value ? field.value : "Project Manager"}
                  value={field.value ? field.value : null}
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
              <FormControl fullWidth sx={{marginBottom:2}}>
                <InputLabel id="demo-simple-select-label">
                  Project Assistant
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label={field.value ? field.value : "Project Assistant"}
                  value={field.value ? field.value : null}
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
              <FormControl fullWidth sx={{marginBottom:2}}>
                <InputLabel id="demo-simple-select-label">
                  Project Status
                </InputLabel>
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label= {field.value ? field.value : "Project Status"}
                  value={field.value ? field.value : null}
                >
                  {statusArray.map((status) => {
                    return <MenuItem value={status}>{status}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="startDate"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }) => (
                <DatePicker
                  label="Start Date"
                  value={value}
                  onChange={(value) =>{
                    onChange(
                      () => {
                        if(value === null){
                          error = {}
                          invalid = false;
                        }
                        else if(value.toString() === "Invalid Date"){
                          error = {message: "Invalid date type"}
                          invalid = true;
                        }
                        else{
                          try{
                            format(value,"yyyy-MM-dd")
                            invalid = false;
                          }
                          catch(e){
                            error = {message: "Invalid date type"}
                            invalid = true;
                          }
                        }
                      }
                    )
                  }          
                  }
                  renderInput={(params) => (
                    <TextField
                      helperText={invalid ? error.message : null}
                      id="startDate"
                      variant="standard"
                      margin="dense"
                      fullWidth
                      color="primary"
                      autoComplete="bday"
                      {...params}
                      error={invalid}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="finishDate"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }) => (
                <DatePicker
                  label="Finish Date"
                  value={value}
                  onChange={(value) =>
                    {
                      
                      onChange(
                        () => {
                          if(value === null){
                            error = {}
                            invalid = false;
                          }
                          else if(value.toString() === "Invalid Date"){
                            error = {message: "Invalid date type"}
                            invalid = true;
                          }
                          else{
                            try{
                              format(value,"yyyy-MM-dd")
                              invalid = false;
                            }
                            catch(e){
                              error = {message: "Invalid date type"}
                              invalid = true;
                            }
                          }
                        }
                      )
                    } 
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{marginBottom:2}}
                      helperText={invalid ? error.message : null}
                      id="finishDate"
                      variant="standard"
                      margin="dense"
                      fullWidth
                      color="primary"
                      autoComplete="bday"
                      {...params}
                      error={invalid}
                    />
                  )}
                />
              )}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default ProjectForm;
