import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";


export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/recipients">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Recipients" />
    </ListItemButton>
  </React.Fragment>
);
