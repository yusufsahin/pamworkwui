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


const statusArray = ["Cancelled","Blocked","ToDo","InProgress","ToVerify","Done"];
const categoryArray = [ "Analysis","Development","Test","Operation","Document"];
const typeArray = ["Task"];

const TaskForm = ({ handleSubmit, control, reset, onSubmit, errors }) => {
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
          name="hoursExpected"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{marginBottom:2}}
              {...field}
              label="Hours Expected"
              rows={8}
              variant="filled"
              fullWidth
              error={"hoursExpected" in errors}
              helperText={errors.point?.message}
            />
          )}
          />
          <Controller
          name="hoursActual"
          control={control}
          render={({ field }) => (
            <TextField
              sx={{marginBottom:2}}
              {...field}
              label="Hours Actual"
              rows={8}
              variant="filled"
              fullWidth
              error={"hoursActual" in errors}
              helperText={errors.point?.message}
            />
          )}
          />
          <Controller
            name="assignTo"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{marginBottom:2, marginTop:2}}>
                <InputLabel id="demo-simple-select-label">
                  Assign To
                </InputLabel>
                <Select
                  {...field}
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
                <InputLabel>
                  Task Status
                </InputLabel>
                <Select
                  {...field}
                
                  value={field.value ? field.value : null}
                >
                  {statusArray.map((status) => {
                    return <MenuItem value={status}>{status}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          />
           <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{marginBottom:2}}>
                <InputLabel>
                  Task Category
                </InputLabel>
                <Select
                  {...field}
                  
                  value={field.value ? field.value : null}
                >
                  {categoryArray.map((category) => {
                    return <MenuItem value={category}>{category}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          />
           <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth sx={{marginBottom:2}}>
                <InputLabel id="demo-simple-select-label">
                  Task Type
                </InputLabel>
                <Select
                  {...field}
                
                  value={field.value ? field.value : null}
                >
                  {typeArray.map((type) => {
                    return <MenuItem value={type}>{type}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="dueDate"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }) => (
                <DatePicker
                  label="Due Date"
                  value={value}
                  onChange={(value) =>
                    onChange(format(value,"yyyy-MM-dd"))
                  }
                  renderInput={(params) => (
                    <TextField
                      sx={{marginBottom:2}}
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
              name="expectedDate"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }) => (
                <DatePicker
                  label="Expected Date"
                  value={value}
                  onChange={(value) =>
                    onChange(format(value,"yyyy-MM-dd"))
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Controller
              name="actualDate"
              control={control}
              defaultValue={null}
              render={({
                field: { onChange, value },
                fieldState: { error, invalid },
              }) => (
                <DatePicker
                  label="Actual Date"
                  value={value}
                  onChange={(value) =>
                    onChange(format(value,"yyyy-MM-dd"))
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

export default TaskForm;
