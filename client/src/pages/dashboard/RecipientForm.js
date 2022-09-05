import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import {
  Button,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Typography,
} from "@mui/material";
import countriesAndCities from "../../data/";
import getCountryPhoneCode from "../../utils/getCountryPhoneCode";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const validationSchema = yup.object().shape({
  firstName: yup.string().required().label("First Name"),
  middleName: yup.string().label("Middle Name"),
  lastName: yup.string().required().label("Last Name"),
  emailAddress: yup.string().email().required().label("Email Address"),
  // city: yup.string().required().label("City"),
  // countryOfResidence: yup.string().required().label("Country of Residence"),
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
    let newCountry = event.target.value;
    formik.setFieldValue("countryOfResidence", newCountry);
    console.log(newCountry);
    let phoneCode = getCountryPhoneCode(newCountry);
    setCountryPhoneCode(phoneCode);
    setCountry(newCountry);
    let cityOptions = filterCitiesByCountry(newCountry);
    console.log(cityOptions);
    setCities(cityOptions);
    let initialCity = cityOptions[0].value;
    setCity(initialCity);
  };

  const handleChangeCity = (event) => {
    let newCity = event.target.value;
    console.log(newCity);
    formik.setFieldValue("city", newCity);
    setCity(newCity);
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
      city: city,
      countryOfResidence: country,
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (
      values,
      { setErrors, setStatus, setSubmitting, resetForm }
    ) => {
      console.log(values);
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

        const headers = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        };
        const data = {
          firstName,
          middleName,
          lastName,
          emailAddress,
          city,
          countryOfResidence,
          phoneNumber: countryPhoneCode + phoneNumber,
        };

        const response = await axios.post("/recipients", data, headers);

        console.log(response.data);

        setStatus({ success: true });
        setSubmitting(false);
        resetForm({});
        navigate("/recipients");
      } catch (error) {
        const errorMsg = handleCustomError(error);
        setStatus({ success: false });
        setErrors({ submit: errorMsg });
        setSubmitting(false);
      }
    },
  });
  return (
    <Container component="main">
      <Item>
        <Box
          mt={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={8} sm={8} md={5}>
            <Typography component="h1" variant="h5">
              Add New Recipient
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={Boolean(
                      formik.touched.firstName && formik.errors.firstName
                    )}
                    helperText={
                      formik.touched.firstName &&
                      formik.errors.firstName &&
                      formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="middleName"
                    label="Middle Name"
                    name="middleName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.middleName}
                    error={Boolean(
                      formik.touched.middleName && formik.errors.middleName
                    )}
                    helperText={
                      formik.touched.middleName &&
                      formik.errors.middleName &&
                      formik.errors.middleName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    error={Boolean(
                      formik.touched.lastName && formik.errors.lastName
                    )}
                    helperText={
                      formik.touched.lastName &&
                      formik.errors.lastName &&
                      formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
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
                      formik.errors.emailAddress &&
                      formik.errors.emailAddress
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="outlined-select-country"
                    select
                    label="Country"
                    value={country}
                    onChange={handleChangeCountry}
                  >
                    {countries.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
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
                      formik.errors.phoneNumber &&
                      formik.errors.phoneNumber
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                disabled={formik.isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Grid>
        </Box>
      </Item>
    </Container>
  );
}
