import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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

let validationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email Address"),
  password: yup.string().required().label("Password"),
});

export default function SignInPage() {
  const navigate = useNavigate();

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
        navigate("/dashboard");
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
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
                formik.errors.email && <div>{formik.errors.email}</div>
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={
                formik.touched.password &&
                formik.errors.password && <div>{formik.errors.password}</div>
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              loading={formik.isSubmitting}
              disabled={formik.isSubmitting}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
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
