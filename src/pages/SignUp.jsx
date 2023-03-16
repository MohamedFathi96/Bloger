import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import Grow from "@mui/material/Grow";

import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";

export default function SignUp() {
  const { signUp } = useAuthContext();
  const [passwordErr, setPasswordErr] = useState(false);
  const [emailErr, setemailErr] = useState(false);
  const [alertErr, setAlertErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPasswordErr(false);
    setemailErr(false);
    const data = new FormData(event.currentTarget);
    const emailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Email Checking
    if (data.get("password") !== data.get("passwordConfirm")) {
      setPasswordErr(true);
      return;
    } else if (!emailRegExp.test(data.get("email"))) {
      setemailErr(true);
      return;
    }

    try {
      setLoading(true);
      const { user } = await signUp(data.get("email"), data.get("password"));
      await updateProfile(user, {
        displayName: `${data.get("firstName")} ${data.get("lastName")}`,
      });
      navigate("/");
    } catch (error) {
      if (error.code.indexOf("use") > 1) {
        setEmailExist(true);
      }
      setAlertErr(true);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right,#4d3a5c,#733c6d,#a03670,#ca2d64,#ec2f4b)",
      }}
      className="h-screen flex justify-center items-center"
    >
      <div className="rounded-3xl bg-white py-7 mx-4">
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    error={emailErr}
                    helperText={emailErr ? "Enter a valid Email address" : ""}
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={passwordErr}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    id="password2"
                    error={passwordErr}
                    helperText={passwordErr ? "Passwords don't match" : ""}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, ideas related to my blogs."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                disabled={loading}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grow
                in={alertErr}
                style={{ transformOrigin: "0 0 0" }}
                {...(alertErr ? { timeout: 1000 } : {})}
              >
                <Alert variant="filled" severity="error">
                  {emailExist
                    ? "Email already in use try another one"
                    : "Sorry Couldn't Sign Up try again!!!"}
                </Alert>
              </Grow>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
}
