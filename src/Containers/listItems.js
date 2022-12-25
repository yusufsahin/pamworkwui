import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DirectionsIcon from '@mui/icons-material/Directions';
import DiamondIcon from '@mui/icons-material/Diamond';
import CasesIcon from '@mui/icons-material/Cases';
import NotesIcon from '@mui/icons-material/Notes';
import {  Link as RouterLink } from "react-router-dom";
export const mainListItems = (
  <React.Fragment>
    <ListItemButton  component={RouterLink} to="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton  component={RouterLink}  to="/projects">
      <ListItemIcon>
        <DirectionsIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/requirements">
      <ListItemIcon>
        <DiamondIcon />
      </ListItemIcon>
      <ListItemText primary="Requirements" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/testcases">
      <ListItemIcon>
        <DoneAllIcon />
      </ListItemIcon>
      <ListItemText primary="Testcases" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/defects">
      <ListItemIcon>
        <CasesIcon />
      </ListItemIcon>
      <ListItemText primary="Defects" />
    </ListItemButton>
    <ListItemButton component={RouterLink} to="/notes">
      <ListItemIcon>
        <NotesIcon />
      </ListItemIcon>
      <ListItemText primary="Notes" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);