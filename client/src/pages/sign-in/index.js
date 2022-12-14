import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SmilingLionImage from "../../assets/images/Smiling-Lion.jpg";
import Copyright from "../../components/Copyright";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import handleCustomError from "../../utils/handleCustomError";
import CustomAlert from "../../components/Alert";
import jwt_decode from "jwt-decode";
import Logo from "../../components/Logo";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";

let validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email Address"),
  password: yup.string().required().label("Password"),
});

export default function SignInPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (
      values,
      { setErrors, setStatus, setSubmitting, resetForm }
    ) => {
      try {
        const { email, password } = values;
        const response = await axios.post("/auth/login", {
          emailAddress: email,
          password,
        });
        const { token } = response.data;

        const decodedInfo = jwt_decode(token);

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("accessToken", token);
        localStorage.setItem("userInfo", JSON.stringify(decodedInfo));

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
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${SmilingLionImage})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Logo />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            {formik.errors.submit && (
              <Box sx={{ mt: 3 }}>
                <CustomAlert
                  severity={"error"}
                  message={formik.errors.submit}
                />
              </Box>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={
                formik.touched.email &&
                formik.errors.email &&
                formik.errors.email
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={
                formik.touched.password &&
                formik.errors.password &&
                formik.errors.password
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              disabled={formik.isSubmitting}
              loading={formik.isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
