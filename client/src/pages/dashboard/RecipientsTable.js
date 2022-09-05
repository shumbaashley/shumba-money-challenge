import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import ActionButtons from "../../components/ActionButtons";
import { Link } from "react-router-dom";
import DeleteDialog from "../../components/DeleteDialog";

export default function RecipientsTable() {
  const [recipients, setRecipients] = useState([]);
  const [recipient, setRecipient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  useEffect(() => {
    const getRecipients = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/recipients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const { recipients } = response.data;
        setRecipients(recipients);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        const errorMsg = handleCustomError(error);
        console.log(errorMsg);
      }
    };

    getRecipients();
  }, []);
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        {" "}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Recipients
          </Typography>
          <Button
            component={Link}
            to="/recipients/new"
            variant="contained"
            size="small"
          >
            Add New
          </Button>
        </Stack>
        {loading && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <CircularProgress color="inherit" />
          </Stack>
        )}
        {!loading && recipients.length > 0 && (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Country</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipients.map((recipient) => (
                <TableRow key={recipient._id}>
                  <TableCell>
                    {recipient.firstName} {recipient.lastName}
                  </TableCell>
                  <TableCell>{recipient.phoneNumber}</TableCell>
                  <TableCell>{recipient.emailAddress}</TableCell>
                  <TableCell>{recipient.city}</TableCell>
                  <TableCell>{recipient.countryOfResidence}</TableCell>
                  <TableCell align="right">
                    <ActionButtons
                      recipient={recipient}
                      setRecipient={setRecipient}
                      setOpenDeleteDialog={setOpenDeleteDialog}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!loading && recipients.length === 0 && (
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="body1" gutterBottom>
              No recipients available.
            </Typography>
          </Stack>
        )}
      </Paper>
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
        recipient={recipient}
      />
    </Grid>
  );
}
