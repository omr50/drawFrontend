import React from "react";
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { Link } from "react-router-dom";

interface UserData {
  id: number;
  name: string;
  username: boolean;
  email: string;
  image: string;
}

interface UserPaperProps {
  user: UserData;
}

const ProfileCard: React.FC<UserPaperProps> = ({ user }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={4}
      sx={{
        padding: theme.spacing(3),
        textAlign: "center",
        borderRadius: "1rem",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          alt={user.name}
          src={user.image}
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: 200,
            maxHeight: 200,
            mb: 2,
            borderRadius: "50%",
            border: "4px solid #fff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>
      <Typography component="h1" variant="h4" mb={2}>
        Welcome, {user.name}!
      </Typography>
      <Typography variant="body1" color="textSecondary" mb={4}>
        {user.email} | @{user.username}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/playSmode"
          startIcon={<SportsEsportsIcon />}
          sx={{ width: "100%" }}
        >
          Play Single Player Mode
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          component={Link}
          to="/playMmode"
          startIcon={<SportsEsportsIcon />}
          sx={{ width: "100%" }}
        >
          Play Multiplayer Mode
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileCard;
