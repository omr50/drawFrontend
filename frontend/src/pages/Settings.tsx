import React, { useEffect } from "react";
import {
  TextField,
  Avatar,
  Button,
  Container,
  Grid,
  CssBaseline,
  Paper,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useNavigate } from "react-router-dom";
import { updateUserThunk } from "../redux/user/user.actions";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Points,
  Float32BufferAttribute,
} from "three";

const Settings: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch() as ThunkDispatch<RootState, null, AnyAction>;
  const navigate = useNavigate();
  const [passwordsMatch, setPasswordsMatch] = React.useState(true);

  const [userData, setUserData] = React.useState({
    email: user.email,
    name: user.name,
    username: user.username,
    password: "",
    confirmPassword: "",
  });

  const handleAvatarClick = () => {
    navigate("/settings/avatars");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (userData.password && userData.confirmPassword) ||
      (!userData.password && !userData.confirmPassword)
    ) {
      const updatedUserData: any = {};

      if (userData.email !== user.email) {
        updatedUserData.email = userData.email;
      }
      if (userData.username !== user.username) {
        updatedUserData.username = userData.username;
      }
      if (userData.name !== user.name) {
        updatedUserData.name = userData.name;
      }

      if (userData.password && userData.password === userData.confirmPassword) {
        updatedUserData.password = userData.password;
        setPasswordsMatch(true);
      } else {
        setPasswordsMatch(false);
      }

      if (Object.keys(updatedUserData).length > 0) {
        dispatch(updateUserThunk(updatedUserData));
      }
    }
  };

  // useEffect(() => {
  //   const createPointsMesh = () => {
  //     const scene = new Scene();
  //     const camera = new PerspectiveCamera(
  //       75,
  //       window.innerWidth / window.innerHeight,
  //       0.1,
  //       1000
  //     );
  //     const renderer = new WebGLRenderer();
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     document
  //       .getElementById("three-js-container")
  //       ?.appendChild(renderer.domElement);

  //     const geometry = new BufferGeometry();
  //     const numPoints = 1000;
  //     const positions = new Float32Array(numPoints * 3);

  //     for (let i = 0; i < numPoints * 3; i += 3) {
  //       const radius = 7;
  //       const theta = Math.random() * 2 * Math.PI;
  //       const phi = Math.acos(2 * Math.random() - 1);
  //       positions[i] = radius * Math.sin(phi) * Math.cos(theta);
  //       positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
  //       positions[i + 2] = radius * Math.cos(phi);
  //     }

  //     geometry.setAttribute(
  //       "position",
  //       new BufferAttribute(new Float32Array(positions), 3)
  //     );

  //     // geometry.setAttribute(
  //     //   "position",
  //     //   new Float32BufferAttribute(positions, 3)
  //     // );

  //     const material = new PointsMaterial({ size: 0.05, color: 0xffffff });
  //     const points = new Points(geometry, material);
  //     scene.add(points);

  //     camera.position.z = 5;

  //     const animate = () => {
  //       requestAnimationFrame(animate);
  //       renderer.render(scene, camera);
  //     };

  //     animate();

  //     window.addEventListener("resize", () => {
  //       const newWidth = window.innerWidth;
  //       const newHeight = window.innerHeight;

  //       camera.aspect = newWidth / newHeight;
  //       camera.updateProjectionMatrix();

  //       renderer.setSize(newWidth, newHeight);
  //     });
  //   };

  //   createPointsMesh();
  // }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CssBaseline />
      <Container maxWidth={false} sx={{ mt: 15, mb: 5 }}>
        <Paper
          elevation={8}
          sx={{
            padding: 5,
            textAlign: "center",
          }}
        >
          <Button
            onClick={handleAvatarClick}
            disableRipple
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
          >
            <Avatar
              alt={user.name}
              src={user.image}
              sx={{
                width: "100%",
                height: "auto",
                maxWidth: 300,
                maxHeight: 300,
                border: "4px solid #fff",

                mb: 2,
                "&:hover": {
                  border: "2px solid #007BFF",
                  transform: "scale(1.05)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                  "&::after": {
                    content: "'Change Avatar'",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                  },
                },
              }}
            />
          </Button>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  variant="outlined"
                  error={userData.password !== userData.confirmPassword}
                  helperText={
                    userData.password !== userData.confirmPassword &&
                    !!userData.confirmPassword
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  error={userData.password !== userData.confirmPassword}
                  helperText={
                    userData.password !== userData.confirmPassword &&
                    !!userData.confirmPassword &&
                    "Passwords do not match"
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        {/* <div
        id="three-js-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      /> */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(45deg, #2196F3, #FF5722)",
            // animation: "gradientAnimation 15s ease infinite",
            zIndex: -1,
          }}
        />
      </Container>
    </Box>
  );
};

export default Settings;
