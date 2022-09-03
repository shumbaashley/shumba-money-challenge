import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import { Button, InputAdornment, MenuItem } from "@mui/material";

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  middleName: yup.string().label("Middle Name"),
  lastName: yup.string().required().label("Last Name"),
  emailAddress: yup.string().email().required().label("Email Address"),
  city: yup.string().required().label("City"),
  countryOfResidence: yup.string().required().label("Country of Residence"),
  phoneNumber: yup.string().required().label("Phone Number"),
});

const countries = [
  {
    value: "Botswana",
    label: "Botswana",
  },
  {
    value: "South Africa",
    label: "South Africa",
  },
  {
    value: "United Kingdom",
    label: "United Kingdom",
  },
  {
    value: "Zimbabwe",
    label: "Zimbabwe",
  },
];

const cities = [
  {
    value: "Gaborone",
    label: "Gaborone",
  },
  {
    value: "Cape Town",
    label: "Cape Town",
  },
  {
    value: "London",
    label: "London",
  },
  {
    value: "Harare",
    label: "Harare",
  },
];

export default function RecipientForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      city: "",
      countryOfResidence: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (
      values,
      { setErrors, setStatus, setSubmitting, resetForm }
    ) => {
      try {
        const {
          firstName,
          middleName,
          lastName,
          emailAddress,
          city,
          countryOfResidence,
          phoneNumber,
        } = values;
        const response = await axios.post(
          "/recipients",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
          {
            firstName,
            middleName,
            lastName,
            emailAddress,
            city,
            countryOfResidence,
            phoneNumber,
          }
        );

        console.log(response.data);

        setStatus({ success: true });
        setSubmitting(false);
        resetForm({});
        navigate("/");
      } catch (error) {
        const errorMsg = handleCustomError(error);
        setStatus({ success: false });
        setErrors({ submit: errorMsg });
        setSubmitting(false);
      }
    },
  });
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <TextField
          defaultValue=""
          id="firstName"
          label="First Name"
          name="firstName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          error={Boolean(formik.touched.firstName && formik.errors.firstName)}
          helperText={
            formik.touched.firstName &&
            formik.errors.firstName && <div>{formik.errors.firstName}</div>
          }
        />
        <TextField
          defaultValue=""
          id="middleName"
          label="Middle Name"
          name="middleName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.middleName}
          error={Boolean(formik.touched.middleName && formik.errors.middleName)}
          helperText={
            formik.touched.middleName &&
            formik.errors.middleName && <div>{formik.errors.middleName}</div>
          }
        />
      </div>
      <div>
        <TextField
          defaultValue=""
          id="lastName"
          label="Last Name"
          name="lastName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          error={Boolean(formik.touched.lastName && formik.errors.lastName)}
          helperText={
            formik.touched.lastName &&
            formik.errors.lastName && <div>{formik.errors.lastName}</div>
          }
        />
        <TextField
          defaultValue=""
          id="emailAddress"
          label="Email Address"
          name="emailAddress"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.emailAddress}
          error={Boolean(
            formik.touched.emailAddress && formik.errors.emailAddress
          )}
          helperText={
            formik.touched.emailAddress &&
            formik.errors.emailAddress && (
              <div>{formik.errors.emailAddress}</div>
            )
          }
        />
      </div>
      <div>
        <TextField
          id="outlined-select-country"
          select
          label="Country of Residence"
          value={formik.values.countryOfResidence}
          onChange={formik.handleChange}
        >
          {countries.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-city"
          select
          label="City"
          value={formik.values.city}
          onChange={formik.handleChange}
        >
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          defaultValue=""
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">+263</InputAdornment>
            ),
          }}
          error={Boolean(
            formik.touched.phoneNumber && formik.errors.phoneNumber
          )}
          helperText={
            formik.touched.phoneNumber &&
            formik.errors.phoneNumber && <div>{formik.errors.phoneNumber}</div>
          }
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        disabled={formik.isSubmitting}
        sx={{ mt: 3, mb: 2 }}
      >
        Save
      </Button>
    </Box>
  );
}
