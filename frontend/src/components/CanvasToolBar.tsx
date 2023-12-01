import React from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { AutoFixHigh, Draw, Clear } from "@mui/icons-material";

interface CanvasToolBarProps {
  isErasing: boolean;
  darkMode: boolean;
  setIsErasing: React.Dispatch<React.SetStateAction<boolean>>;
  clearCanvas: () => void;
}

const CanvasToolBar: React.FC<CanvasToolBarProps> = ({
  isErasing,
  darkMode,
  setIsErasing,
  clearCanvas,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Button
        onClick={() => setIsErasing(true)}
        sx={{
          "&:hover": { backgroundColor: "transparent" },
        }}
        disableTouchRipple
      >
        <IconButton
          color={isErasing ? (darkMode ? "secondary" : "primary") : "default"}
          size="large"
        >
          <AutoFixHigh sx={{ mb: 1.5 }} />
        </IconButton>
        <Typography
          variant="caption"
          sx={{
            color: darkMode ? "white" : "black",
          }}
        >
          Eraser
        </Typography>
      </Button>

      <Button
        onClick={() => setIsErasing(false)}
        sx={{
          "&:hover": { backgroundColor: "transparent" },
        }}
        disableTouchRipple
      >
        <IconButton
          color={isErasing ? "default" : darkMode ? "secondary" : "primary"}
          size="large"
        >
          <Draw sx={{ mb: 1 }} />
        </IconButton>
        <Typography
          variant="caption"
          sx={{
            color: darkMode ? "white" : "black",
          }}
        >
          Pencil
        </Typography>
      </Button>

      <Button
        onClick={clearCanvas}
        sx={{
          "&:hover": { backgroundColor: "transparent" },
        }}
        disableTouchRipple
      >
        <IconButton color={darkMode ? "error" : "error"} size="large">
          <Clear sx={{ mb: 0.5 }} />
        </IconButton>
        <Typography
          variant="caption"
          sx={{
            color: darkMode ? "white" : "black",
          }}
        >
          Clear
        </Typography>
      </Button>
    </Box>
  );
};

export default CanvasToolBar;
