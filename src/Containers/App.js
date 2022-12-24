import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";

import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { mainListItems, secondaryListItems } from "./listItems";
import Chart from "./Chart";
import Deposits from "./Deposits";
import Orders from "./Orders";

import Footer from "../Components/Nav/Footer";
import MenuBar from "../Components/Nav/MenuBar";
import MenuDrawer from "../Components/Nav/MenuDrawer";
import Signin from "../Components/Auth/Signin";

import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "../Libs/ProtectedRoute";
import Dashboard from "./Dashboard";
import Signup from "../Components/Auth/Signup";
import ProjectList from "../Components/Projects/ProjectList";
import RequirementList from "../Components/Requirements/RequirementList";
import TestcaseList from "../Components/Testcases/TestcaseList";
import DefectList from "../Components/Defects/DefectList";
import ModalManager from "../Libs/ModalManager";

const mdTheme = createTheme();

const App = () => {
  const isAuthenticated = useSelector(
    (state) => state.security.isAuthenticated
  );

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
  <>
  <ModalManager/>
    <ThemeProvider theme={mdTheme}>
      {isAuthenticated ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />

          <MenuBar open={open} toggleDrawer={toggleDrawer} />

          <MenuDrawer
            open={open}
            toggleDrawer={toggleDrawer}
            mainListItems={mainListItems}
            secondaryListItems={secondaryListItems}
          />

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/projects"
                      element={
                        <ProtectedRoute>
                          <ProjectList />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/requirements"
                      element={
                        <ProtectedRoute>
                          <RequirementList />
                        </ProtectedRoute>
                      }
                    />
                     <Route
                      path="/testcases"
                      element={
                        <ProtectedRoute>
                          <TestcaseList />
                        </ProtectedRoute>
                      }
                    />
                     <Route
                      path="/defects"
                      element={
                        <ProtectedRoute>
                          <DefectList />
                        </ProtectedRoute>
                      }
                    />
                    
                  </Routes>

                  <Footer sx={{ pt: 4 }} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      ) : (
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={24} md={16} lg={19}>
                <Routes>
                  <Route path="/" element={<Signin />} />
                  <Route path="/signin" element={<Signin />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </ThemeProvider>
    </>
  );
};

export default App;
