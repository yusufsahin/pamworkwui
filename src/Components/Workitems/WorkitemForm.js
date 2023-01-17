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

const stateArray = [
  "Cancelled",
  "Blocked",
  "InBackLog",
  "WIP",
  "ReadyToTest",
  "InTest",
  "Deployed",
  "Released",
];
const categoryArray = [
  "Analysis",
  "Development",
  "Test",
  "Operation",
  "Document",
];
const typeArray = ["Request", "UserStory", "Bug", "Ticket"];

const WorkitemForm = ({ handleSubmit, control, reset, onSubmit, errors }) => {
  const users = useSelector((state) => state.user.users);

  return (
    <div>
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
                        sx={{ marginBottom: 2 }}
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
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        sx={{ marginBottom: 2 }}
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
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={3}>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                          <InputLabel id="demo-simple-select-label">
                            Workitem Type
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
                  </Grid>

                  <Grid item xs={3}>
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                          <InputLabel>Workitem Status</InputLabel>
                          <Select
                            {...field}
                            value={field.value ? field.value : null}
                          >
                            {stateArray.map((state) => {
                              return <MenuItem value={state}>{state}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                          <InputLabel>Workitem Category</InputLabel>
                          <Select
                            {...field}
                            value={field.value ? field.value : null}
                          >
                            {categoryArray.map((category) => {
                              return (
                                <MenuItem value={category}>{category}</MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Controller
                      name="responsibleUser"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          sx={{ marginBottom: 2, marginTop: 2 }}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Responsible User
                          </InputLabel>
                          <Select
                            {...field}
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
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={3}>
                    <Controller
                      name="point"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          sx={{ marginBottom: 2 }}
                          {...field}
                          label="Point"
                          rows={8}
                          variant="filled"
                          fullWidth
                          error={"point" in errors}
                          helperText={errors.point?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
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
                  <Button type="submit" variant="contained">
                    Save
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </form>
      </Box>
    </div>
  );
};

export default WorkitemForm;
