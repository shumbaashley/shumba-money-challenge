import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";

const CustomAlert = ({ severity, message }) => {
  return (
    <Alert severity={severity}>
      <AlertTitle>Error</AlertTitle>
      {message}
    </Alert>
  );
};

CustomAlert.propTypes = {
  severity: PropTypes.string,
  message: PropTypes.string,
};

export default CustomAlert;
