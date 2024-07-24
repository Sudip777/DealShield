import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../api/consumer";
import { useAuth } from "../hooks/auth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// eslint-disable-next-line react/prop-types
export default function SignIn({ userType }) {
  let loggedIn = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (loggedIn) {
      if (userType == "consumer") navigate("/Consumer");
      if (userType == "provider") navigate("/Provider");
      if (userType == "admin") navigate("/Admin");
    }
  }, [loggedIn, navigate, userType]);

  const handleLoginSubmit = async (data, event) => {
    setLoading(true);
    // event.preventDefault();
    // const data = new FormData(event.currentTarget);
    await Login(userType, data.email, data.password);
    setLoading(false);
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
          <LockOutlinedIcon />
        </Avatar>
        {/* {userType == "consumer" ? } */}
        <Typography component="h1" variant="h5">
          Sign in{" "}
          {userType == "consumer" ? (
            <b>as Consumer</b>
          ) : userType == "provider" ? (
            <b>as Provider</b>
          ) : (
            <b>as Admin</b>
          )}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLoginSubmit)}
          sx={{ mt: 1 }}
        >
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
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            {...register("password", {
              required: "Password is required",
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            type="submit"
            disabled={loading}
            variant="contained"
            style={{
              marginTop: 3,
              marginBottom: 2,
            }}
          >
            Sign In
          </Button>
          {userType != "admin" ? (
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  to={
                    userType == "consumer" ? "/register" : "/provider-register"
                  }
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Escrow App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
