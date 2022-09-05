import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import LoadingButton from '@mui/lab/LoadingButton';

export default function DeleteDialog({
  openDeleteDialog,
  setOpenDeleteDialog,
  recipient,
}) {
  const [loading, setLoading] = React.useState(false);

  console.log(recipient);

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };
  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/recipients/${recipient._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMsg = handleCustomError(error);
      console.log(errorMsg);
    }
    setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete recipient?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete {recipient?.firstName}{" "}
            {recipient?.lastName} from recipients list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>Cancel</Button>
          <LoadingButton
            onClick={handleConfirmDelete}
            color="error"
            loading={loading}

            autoFocus
          >
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
