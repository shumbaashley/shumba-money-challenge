import { Grid, Paper } from "@mui/material";
import React from "react";
import Recipients from "./Recipients";

const RecipientsTable = () => {
  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Recipients />
      </Paper>
    </Grid>
  );
};

export default RecipientsTable;
