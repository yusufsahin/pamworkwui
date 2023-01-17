import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import {
  getProjects,
  changeProject,
  deleteProject,
} from "../../Store/projectSlice";
import Button from "@mui/material/Button";
import { openModal } from "../../Store/modalSlice";
import { Parser } from "html-to-react";
import { getUsers } from "../../Store/userSlice";
import Icon from "@mui/material/Icon";
import Chip from "@mui/material/Chip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

const ProjectMenu = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.projects);
  const loading = useSelector((state) => state.project.loading);
  const currentProject = useSelector((state) => state.project.currentProject);
  const err = useSelector((state) => state.project.err);

  useEffect(() => {
    const fetchData = async () => {
      // You can await here
      await dispatch(getProjects());
      dispatch(getUsers());
      // ...
    };
    fetchData();
  }, []);

  const handleEdit = async (record) => {
    console.log(record);
    await dispatch(changeProject(record)).then(
      dispatch(
        openModal({
          modalType: "ProjectEditModal",
          modalProps: { title: "Edit Project" },
        })
      )
    );
  };

  const handleDelete = (project) => {
    dispatch(changeProject(project)).then(
      dispatch(
        openModal({
          modalType: "ProjectDeleteModal",
          modalProps: { title: "Delete Project" },
        })
      )
    );
  };

  if (loading === true) {
    return <CircularProgress />;
  }
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem>
              <Stack direction="row" spacing={2}>
                {" "}
                <IconButton
                  color="primary"
                  aria-label="Add Project"
                  component="label"
                  onClick={() =>
                    dispatch(
                      openModal({
                        modalType: "ProjectNewModal",
                        modalProps: {},
                      })
                    )
                  }
                  sx={{
                    marginBottom: 2,
                  }}
                >
                  <AddCircleIcon fontSize="small" />
                </IconButton>
                <ListItemText primary="Projects"/>
              </Stack>
            </ListItem>
            <Divider />
            {projects.map((project) => (
              <ListItem disablePadding key={project.id}>
                <ListItemButton
                  onClick={() => {
                    dispatch(changeProject(project));
                  }}
                  selected={project.id === currentProject.id ? true : false}
                >
                  <ListItemText primary={project.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </nav>
        <Divider />
      </Box>
    </div>
  );
};

export default ProjectMenu;
