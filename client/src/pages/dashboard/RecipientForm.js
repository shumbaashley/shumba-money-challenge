import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import {
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import countriesAndCities from "../../data/";
import getCountryPhoneCode from "../../utils/getCountryPhoneCode";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CustomizedSnackbars from "../../components/CustomSnackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import editRecipientPhoneNumber from "../../utils/editRecipientPhoneNumber";

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
  phoneNumber: yup.number("Not a valid phone number").required().label("Phone Number"),
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

export default function RecipientForm({ title }) {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [countryPhoneCode, setCountryPhoneCode] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState(null);
  let { recipientId } = useParams();

  const handleChangeCountry = (event, setFieldValue) => {
    let newCountry = event.target.value;
    setFieldValue("countryOfResidence", newCountry);
    console.log(newCountry);
    let phoneCode = getCountryPhoneCode(newCountry);
    setCountryPhoneCode(phoneCode);
    setCountry(newCountry);
    let cityOptions = filterCitiesByCountry(newCountry);
    console.log(cityOptions);
    setCities(cityOptions);
    let initialCity = cityOptions[0].value;
    setCity(initialCity);
    setFieldValue("city", initialCity);
  };

  const handleChangeCity = (event, setFieldValue) => {
    let newCity = event.target.value;
    console.log(newCity);
    setFieldValue("city", newCity);
    setCity(newCity);
  };

  const initializeValues = (givenCountry, givenCity) => {
    let countryOptions = countriesAndCities.map((country) => {
      return { value: country.name, label: country.name };
    });
    setCountries(countryOptions);

    let cityOptions = filterCitiesByCountry(
      givenCountry || countryOptions[0].value
    );
    setCities(cityOptions);

    let initialCountry = givenCountry || countryOptions[0].value;
    let initialCity = givenCity || cityOptions[0].value;

    setCity(initialCity);
    setCountry(initialCountry);

    let phoneCode = getCountryPhoneCode(initialCountry);

    setCountryPhoneCode(phoneCode);
  };

  useEffect(() => {
    // initialize dropdown values

    console.log(recipientId);
    setLoading(true);

    if (recipientId) {
      // when editing a recipient

      const getSingleRecipient = async (id) => {
        try {
          const response = await axios.get(`/recipients/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          const { recipient } = response.data;
          setRecipient(recipient);
          initializeValues(recipient.countryOfResidence, recipient.city);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          const errorMsg = handleCustomError(error);
          console.log(errorMsg);
        }
      };

      getSingleRecipient(recipientId);
    } else {
      //  when creating a new recipient
      initializeValues();
    }

    setLoading(false);
  }, [recipientId]);

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
          <Grid item xs={8} sm={8} md={6}>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
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
            {!loading && city && country && (
              <Formik
                initialValues={{
                  firstName: recipient ? recipient.firstName : "",
                  middleName: recipient ? recipient.middleName : "",
                  lastName: recipient ? recipient.lastName : "",
                  emailAddress: recipient ? recipient.emailAddress : "",
                  city: city,
                  countryOfResidence: country,
                  phoneNumber: recipient
                    ? editRecipientPhoneNumber(
                        recipient.phoneNumber,
                        recipient.countryOfResidence
                      )
                    : "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (
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
                        Authorization: `Bearer ${localStorage.getItem(
                          "accessToken"
                        )}`,
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
                    if (recipientId) {
                      await axios.patch(
                        `/recipients/${recipientId}`,
                        data,
                        headers
                      );
                      setSnackbarSeverity("info");
                      setSnackbarMessage("Recipient updated successfully");
                      setOpenSnackbar(true);
                    } else {
                      await axios.post("/recipients", data, headers);
                      setSnackbarSeverity("success");
                      setSnackbarMessage("Recipient created successfully");
                      setOpenSnackbar(true);
                    }

                    setStatus({ success: true });
                    setSubmitting(false);
                    resetForm({});
                    setTimeout(() => {
                      navigate("/recipients");
                    }, 1500);
                  } catch (error) {
                    const errorMsg = handleCustomError(error);
                    setStatus({ success: false });
                    setErrors({ submit: errorMsg });
                    setSubmitting(false);

                    setSnackbarSeverity("error");
                    setSnackbarMessage(errorMsg);
                    setOpenSnackbar(true);
                  }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  setFieldValue,
                }) => (
                  <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={
                            touched.firstName &&
                            errors.firstName &&
                            errors.firstName
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="middleName"
                          label="Middle Name"
                          name="middleName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.middleName}
                          error={Boolean(
                            touched.middleName && errors.middleName
                          )}
                          helperText={
                            touched.middleName &&
                            errors.middleName &&
                            errors.middleName
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="lastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.lastName}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={
                            touched.lastName &&
                            errors.lastName &&
                            errors.lastName
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="emailAddress"
                          label="Email Address"
                          name="emailAddress"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.emailAddress}
                          error={Boolean(
                            touched.emailAddress && errors.emailAddress
                          )}
                          helperText={
                            touched.emailAddress &&
                            errors.emailAddress &&
                            errors.emailAddress
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
                          onChange={(event) =>
                            handleChangeCountry(event, setFieldValue)
                          }
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
                          onChange={(event) =>
                            handleChangeCity(event, setFieldValue)
                          }
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
                          type="number"
                          id="phoneNumber"
                          label="Phone Number"
                          name="phoneNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                {countryPhoneCode}
                              </InputAdornment>
                            ),
                          }}
                          error={Boolean(
                            touched.phoneNumber && errors.phoneNumber
                          )}
                          helperText={
                            touched.phoneNumber &&
                            errors.phoneNumber &&
                            errors.phoneNumber
                          }
                        />
                      </Grid>
                    </Grid>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      {recipientId ? "Update" : "Submit"}
                    </LoadingButton>
                  </Box>
                )}
              </Formik>
            )}
          </Grid>
        </Box>
      </Item>
      <CustomizedSnackbars
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </Container>
  );
}
