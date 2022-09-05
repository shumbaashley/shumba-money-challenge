import * as React from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

export default function ActionButtons({ recipient }) {


  const handleDelete = () => {
    alert("delete");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup size="large" aria-label="large button group">
        <IconButton component={Link} to={`/recipients/${recipient._id}/edit`} key="one" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton key="two" aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
}
