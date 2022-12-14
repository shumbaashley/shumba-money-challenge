import * as React from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";

export default function ActionButtons({
  recipient,
  setRecipient,
  setOpenDeleteDialog,
}) {
  const handleDelete = () => {
    setRecipient(recipient);
    setOpenDeleteDialog(true);
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
        <Tooltip title="Edit Recipient">
          <IconButton
            color="primary"
            component={Link}
            to={`/recipients/${recipient._id}/edit`}
            key="one"
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Recipient">
          <IconButton
            key="two"
            color="error"
            aria-label="delete"
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ButtonGroup>
    </Box>
  );
}
