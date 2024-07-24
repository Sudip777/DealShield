/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { useEffect, useState } from "react";
import { SignUp } from "../api/consumer";
import { useForm } from "react-hook-form";
import PreferenceSelection from "../components/PreferenceSelection";

// eslint-disable-next-line react/prop-types
function Register({ userType }) {
  let loggedIn = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [costPref, setCostPref] = useState(50);
  const [trustPref, setTrustPref] = useState(50);

  useEffect(() => {
    if (loggedIn) {
      userType == "consumer" ? navigate("/consumer") : navigate("/provider");
    }
  }, [loggedIn, navigate, userType]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const handleRegisterSubmit = async (data, errors) => {
    setLoading(true);
    if (userType == "consumer") {
      data = {
        ...data,
        lowCostPref: costPref,
        trustPref: trustPref,
      };
    }
    await SignUp(userType, data);
    setLoading(false);
  };

  const handleChange = (event, newValue) => {
    setCostPref(newValue);
  };
  const handleTrustChange = (event, newValue) => {
    setTrustPref(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up <b>as {userType.toUpperCase()}</b>
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleRegisterSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstName", {
                  required: "FirstName is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
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
                {...register("lastName", {
                  required: "LastName is required",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("phone", {
                  required: "Phone is required",
                  minLength: 10,
                  maxLength: 10,
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                required
                fullWidth
                name="phone"
                label="Phone"
                id="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register("password", {
                  required: true,
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            {userType == "consumer" && (
              <Box mt={2} width="100%">
                <Typography>Low Cost Preferences: </Typography>
                <Slider
                  sx={{
                    flexGrow: 1,
                  }}
                  defaultValue={costPref}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={handleChange}
                />

                <Typography>Trust Preferences: </Typography>
                <Slider
                  sx={{
                    flexGrow: 1,
                  }}
                  defaultValue={trustPref}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={handleTrustChange}
                />
              </Box>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
          <Grid container justifyContent="flex-end" mb={5}>
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
