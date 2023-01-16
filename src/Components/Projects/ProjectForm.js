import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import { useForm, Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import ReactQuillToolBar from "../../Libs/ReactQuillToolBar";

import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

const statusArray = ["Initation", "Planning", "Execution", "Monitor", "Closed"];

const ProjectForm = ({ handleSubmit, control, reset, onSubmit, errors }) => {
  const users = useSelector((state) => state.user.users);

  return (
    <>
      <Box sx={{ mt: 1 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper>
            <Box>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Name"
                        variant="filled"
                        fullWidth
                        error={"name" in errors}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        variant="filled"
                        fullWidth
                        error={"description" in errors}
                        helperText={errors.description?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                  <Grid item xs={3}>
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
                            value={field.value ? field.value : null}
                          >
                            {users.map((user) => {
                              return (
                                <MenuItem value={user.username}>
                                  {user.username}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="projectAssistant"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                          <InputLabel id="demo-simple-select-label">
                            Project Assistant
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={field.value ? field.value : null}
                          >
                            {users.map((user) => {
                              return (
                                <MenuItem value={user.username}>
                                  {user.username}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      name="status"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                          <InputLabel id="demo-simple-select-label">
                            Project Status
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={field.value ? field.value : null}
                          >
                            {statusArray.map((status) => {
                              return (
                                <MenuItem value={status}>{status}</MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                  <Grid item xs={4}>
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
                            onChange={(value) =>
                              onChange(format(value, "yyyy-MM-dd"))
                            }
                            renderInput={(params) => (
                              <TextField
                                sx={{ marginBottom: 2 }}
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
                  </Grid>
                  <Grid item xs={4}>
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
                            onChange(format(value, "yyyy-MM-dd"))
                          }
                          renderInput={(params) => (
                            <TextField
                              sx={{ marginBottom: 2 }}
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
                  </Grid>
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </form>
      </Box>
    </>
  );
};

export default ProjectForm;
