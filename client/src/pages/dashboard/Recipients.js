import { Fragment, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, Typography } from "@mui/material";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import ActionButtons from "./ActionButtons";

export default function Recipients() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    const getRecipients = async () => {
      try {
        const response = await axios.get("/recipients", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const { recipients } = response.data;
        setRecipients(recipients);
      } catch (error) {
        const errorMsg = handleCustomError(error);
        console.log(errorMsg);
      }
    };

    getRecipients();
  }, []);
  return (
    <Fragment>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Recipients
        </Typography>
        <Button variant="contained" size="small" href="/recipients/new">
          Add New
        </Button>
      </Stack>
      <Table>
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
                <ActionButtons recipient={recipient} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}
