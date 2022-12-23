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

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(8).required(),
});

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isAuthenticated, err } = useSelector(
    (state) => state.security
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (formProps) => {
    const { username, password } = formProps;
    if (username && password) {
      await dispatch(login(formProps));
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <Login />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            {err && <Typography component="h1" variant="h5">
            {err}
          </Typography>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Username"
                    rows={8}
                    variant="filled"
                    fullWidth
                    error={"username" in errors}
                    helperText={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    rows={8}
                    variant="filled"
                    fullWidth
                    error={"password" in errors}
                    helperText={errors.password?.message}
                  />
                )}
              />

              <Button type="submit" variant="contained">
                Login
              </Button>
              <Button
                onClick={() =>
                  reset({
                    username: "",
                    password: "",
                  })
                }
                variant="outlined"
              >
                Reset
              </Button>
            </form>
          </Box>
          <Link href="signup">
            {'Sign Up'}
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signin;
