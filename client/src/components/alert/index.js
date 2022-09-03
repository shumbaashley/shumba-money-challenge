import { Alert, AlertTitle } from "@mui/material";

const CustomAlert = (severity, message) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

export default CustomAlert;
