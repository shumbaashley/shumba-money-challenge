import {Fragment, useEffect, useState} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";


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
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
      Recipients 
    </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>City</TableCell>
            <TableCell align="right">Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipients.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.firstName} {row.lastName}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
              <TableCell>{row.emailAddress}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell align="right">{row.countryOfResidence}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}