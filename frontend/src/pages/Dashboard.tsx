import React, { useCallback, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Container, CssBaseline, Grid, Paper } from "@mui/material";
import PlayerStats from "../components/PlayerStats";
import RenderBackgroundImage from "../components/RenderBackgroundImage";
import Image from "../assets/background/background1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { fetchUserThunk } from "../redux/user/user.actions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchGamesThunk } from "../redux/games/games.actions";
import Games from "../components/Games";
import ProfileCard from "../components/ProfileCard";
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Points,
} from "three";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const games = useSelector((state: RootState) => state.games.games);
  const theme = useTheme();
  const dispatch = useDispatch() as ThunkDispatch<RootState, null, AnyAction>;

  const fetchData = useCallback(async () => {
    try {
      const cachedUser = localStorage.getItem("cachedUser");
      const cachedGames = localStorage.getItem("cachedGames");
      if (cachedUser) {
        const parsedCachedUser = JSON.parse(cachedUser);
        if (!user || parsedCachedUser.id !== user.id) {
          await dispatch(fetchUserThunk());
        }
      } else {
        await dispatch(fetchUserThunk());
      }
      if (user && cachedGames) {
        const parsedCachedGames = JSON.parse(cachedGames);
        if (
          !games ||
          JSON.stringify(parsedCachedGames) !== JSON.stringify(games)
        ) {
          // if (!games || parsedCachedGames.createdAt !== games[0]?.createdAt) {
          await dispatch(fetchGamesThunk());
        }
      } else {
        await dispatch(fetchGamesThunk());
      }
    } catch (error) {
      console.error("Error fetching user or games:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("cachedUser", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    if (games) {
      localStorage.setItem("cachedGames", JSON.stringify(games));
    }
  }, [games]);
  React.useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const createStarField = () => {
      const scene = new Scene();
      const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document
        .getElementById("three-js-container")
        ?.appendChild(renderer.domElement);

      const starsGeometry = new BufferGeometry();
      const starsMaterial = new PointsMaterial({ color: 0xffffff, size: 1.5 });

      const starsVertices = [];
      for (let i = 0; i < 1000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;

        starsVertices.push(x, y, z);
      }

      starsGeometry.setAttribute(
        "position",
        new BufferAttribute(new Float32Array(starsVertices), 3)
      );

      const stars = new Points(starsGeometry, starsMaterial);
      scene.add(stars);

      camera.position.z = 5;

      const animate = () => {
        requestAnimationFrame(animate);
        stars.rotation.x += 0.0005;
        stars.rotation.y += 0.0005;
        renderer.render(scene, camera);
      };

      animate();

      window.addEventListener("resize", () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(newWidth, newHeight);
      });
    };

    createStarField();
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <RenderBackgroundImage imageSource={Image} low={40} high={80} />
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
        <Container component="main" maxWidth="lg" sx={{ mt: 15 }}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={8}
                sx={{
                  padding: theme.spacing(4),
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  height: "100%",
                }}
              >
                <ProfileCard user={user} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                elevation={8}
                sx={{
                  padding: theme.spacing(4),
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  height: "100%",
                }}
              >
                <PlayerStats games={games} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Paper
                elevation={8}
                sx={{
                  padding: theme.spacing(4),
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "1rem",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Games games={games} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <div
          id="three-js-container"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
          }}
        />
      </Box>
    </div>
  );
};

export default Dashboard;
