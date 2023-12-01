import React from "react";
import { Divider, Paper, Typography } from "@mui/material";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { useTheme } from "@mui/system";
import Chart from "../components/Chart";

interface Game {
  id: number;
  isWon: boolean;
  top3Predications: string;
  createdAt: string;
}

interface PlayerStatsProps {
  games: Game[];
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ games }) => {
  const theme = useTheme();

  const stats = games.reduce(
    (acc, game) => {
      if (game.isWon) {
        acc.wins++;
      } else {
        acc.losses++;
      }
      return acc;
    },
    { wins: 0, losses: 0 } as { wins: number; losses: number }
  );

  return (
    <>
      <Paper
        elevation={4}
        sx={{
          padding: theme.spacing(1),
          textAlign: "center",
          borderRadius: "1rem",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{ color: "#007BFF", marginBottom: theme.spacing(2) }}
        >
          Player Stats
        </Typography>
        <Divider sx={{ width: "100%", marginY: theme.spacing(2) }} />

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            marginBottom: theme.spacing(1),
          }}
        >
          Games Played: {games.length}
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: theme.spacing(1),
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "green",
              marginBottom: theme.spacing(1),
            }}
          >
            <SentimentVerySatisfiedIcon
              sx={{
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "16px", md: "18px" },
              }}
            >
              Wins: {stats.wins}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "red",
            }}
          >
            <SentimentVeryDissatisfiedIcon
              sx={{ marginRight: theme.spacing(1) }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "16px", md: "18px" },
                marginRight: theme.spacing(1),
              }}
            >
              Losses: {stats.losses}
            </Typography>
          </div>
        </div>
        <Chart games={games} />
      </Paper>
    </>
  );
};

export default PlayerStats;
