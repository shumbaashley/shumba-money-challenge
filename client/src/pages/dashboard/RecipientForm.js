import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import { Button, InputAdornment, MenuItem } from "@mui/material";
import countriesAndCities from "../../data/";
import getCountryPhoneCode from "../../utils/getCountryPhoneCode";

const validationSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  middleName: yup.string().label("Middle Name"),
  lastName: yup.string().required().label("Last Name"),
  emailAddress: yup.string().email().required().label("Email Address"),
  city: yup.string().required().label("City"),
  countryOfResidence: yup.string().required().label("Country of Residence"),
  phoneNumber: yup.string().required().label("Phone Number"),
});

const filterCitiesByCountry = (countryName) => {
  let selectedCountry = countriesAndCities.filter(
    (country) => country.name === countryName
  );

  let citiesInSelectedCountry = selectedCountry[0].cities;
  let filteredCities = citiesInSelectedCountry.map((city) => {
    return { value: city, label: city };
  });

  return filteredCities;
};

export default function RecipientForm() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState("");

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  useEffect(() => {
    // initialize dropdown values
    let countryOptions = countriesAndCities.map((country) => {
      return { value: country.name, label: country.name };
    });
    setCountries(countryOptions);

    let cityOptions = filterCitiesByCountry(countryOptions[0].value);
    setCities(cityOptions);

    let initialCountry = countryOptions[0].value;
    let initialCity = cityOptions[0].value;

    setCountry(initialCountry);
    setCity(initialCity);

    let phoneCode = getCountryPhoneCode(initialCountry);

    setCountryPhoneCode(phoneCode);
  }, []);

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
          value={country}
          onChange={handleChangeCountry}
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
          value={city}
          onChange={handleChangeCity}
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
          id="phoneNumber"
          label="Phone Number"
          name="phoneNumber"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {countryPhoneCode}
              </InputAdornment>
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
