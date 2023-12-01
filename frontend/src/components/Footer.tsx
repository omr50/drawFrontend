import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useTheme } from "../context/ThemeContext";

function Copyright() {
  const { theme } = useTheme();

  return (
    <Container>
      <Typography
        variant="body2"
        color={theme.palette.secondary.main}
        align="center"
        sx={{
          fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" },
        }}
      >
        {"Copyright © "}
        <Link
          color={theme.palette.secondary.main}
          href="https://github.com/NOKDS/nok-draw"
        >
          NOK
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div>
      <Container
        sx={{
          position: "sticky",
          left: 0,
          bottom: 0,
        }}
        component="footer"
      >
        <Typography
          variant="subtitle1"
          align="center"
          // color="text.secondary"
          component="p"
          color={theme.palette.secondary.main}
          sx={{
            fontSize: { xs: "0.4rem", sm: "0.5rem", md: "0.6rem" },
          }}
        >
          Play & learn!
        </Typography>
        <Copyright />
      </Container>
    </div>
  );
};

export default Footer;
