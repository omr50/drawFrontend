import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Footer from "../components/Footer";
import RenderVideoBackground from "../components/RenderVideoBackground";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { loginUserThunk } from "../redux/user/user.actions";
import Alert from "@mui/material/Alert";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { RootState } from "../redux/rootReducer";
// @ts-ignore
import Video from "../assets/BackgroundVideo2.mp4";
import RenderBackgroundImage from "../components/RenderBackgroundImage";
import Image from "../assets/background/background3.jpg";

const SignIn: React.FC = () => {
  const dispatch = useDispatch() as ThunkDispatch<RootState, null, AnyAction>;
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [hasError, setHasError] = useState(false);

  const resetForm = () => {
    setIdentifier("");
    setPassword("");
    setFormError("");
    setHasError(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isValidIdentifier =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier) ||
      /^[a-zA-Z0-9_]+$/.test(identifier);

    const isValidPassword = (password as string).trim() !== "";

    if (!isValidIdentifier || !isValidPassword) {
      setFormError("Invalid email/username or password.");
      setHasError(true);
      return;
    }

    const userData = {
      email: isValidIdentifier ? identifier : null,
      username: isValidIdentifier ? null : identifier,
      password: password as string,
    };

    if (!userData.email && !userData.username) {
      setFormError("Please enter a valid email or username.");
      setHasError(true);
      return;
    }

    try {
      await dispatch(loginUserThunk(userData));
      resetForm();
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setFormError("Invalid username or password.");
      } else {
        setFormError("An error occurred. Please try again later.");
      }
      setHasError(true);
    }
  };

  return (
    <>
      <RenderBackgroundImage imageSource={Image} low={30} high={70} />

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Paper
            elevation={16}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
              opacity: 0.9,
              borderRadius: 3,
              transition: "box-shadow 0.2s",
              "&:hover": {
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                opacity: 0.95,
              },
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2, p: 2 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="identifier"
                label="Username"
                name="identifier"
                autoComplete="email user-name"
                autoFocus
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {hasError && <Alert severity="error">{formError}</Alert>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, p: 1.5 }}
              >
                Sign In
              </Button>
              <GoogleLoginButton />
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid container justifyContent="center" sx={{ mt: 1 }}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        <Footer />
      </div>
    </>
  );
};

export default SignIn;
