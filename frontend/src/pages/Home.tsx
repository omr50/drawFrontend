import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Typewriter from "typewriter-effect";
import { useTheme } from "../context/ThemeContext";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import RenderBackgroundImage from "../components/RenderBackgroundImage";
import Image1 from "../assets/background/background16.jpg";
import Image2 from "../assets/background/background9.jpg";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

const cardsData = [
  {
    id: 1,
    title: "Single Mode",
    description: "Challenge yourself",
    imageUrl: "https://source.unsplash.com/random?wallpapers",
  },
  {
    id: 2,
    title: "Multipler Mode",
    description: "Challenge your friends",
    imageUrl: "https://source.unsplash.com/random?nature",
  },
];

const FAQData = [
  {
    question: "What is NOK-Draw?",
    answer:
      "NOK-Draw is an exciting drawing game where players create sketches based on given prompts. The drawings are then analyzed by a machine learning model to predict the category. If the prediction matches the prompted category, there is a winner, adding an element of challenge and fun.",
  },
  {
    question: "How do I start playing?",
    answer:
      "To embark on your NOK-Draw journey, sign up for a free account. As a player, you can immerse yourself in drawing with provided prompts in both single-player and multiplayer modes. Alternatively, experience the game as a guest. However, signing up unlocks exciting features such as game history and access to multiplayer group games.",
  },
  {
    question: "Can I play with friends and compete?",
    answer:
      "Absolutely! NOK-Draw supports collaborative drawing with friends. In multiplayer mode, the machine learning model predicts the category of the combined drawings. If the prediction matches the prompt, there's a winner. Track your wins and losses, and enjoy visualizations of your game history.",
  },
];

const Home: React.FC = () => {
  const { darkMode, theme } = useTheme();
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const renderHeaderSection = () => (
    <Box sx={{ pt: 40 }}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{
            color: darkMode === true ? "lime" : "yellow",
            fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          <div className="">
            <Typewriter
              options={{
                strings: [
                  "NOK-Draw",
                  "Dive into artistry!",
                  "Draw for victory!",
                ],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 20,
              }}
            />
          </div>
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{
            color: darkMode === true ? "white" : "white",
            p: 1,
            fontSize: { xs: "0.9rem", sm: "1.1rem", md: "1.2rem" },
          }}
        >
          Will your creations conquer the machine's judgment? Get ready to
          sketch, astonish, and claim your artistic triumph!
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="outlined"
            component={Link}
            to="/playSmode"
            sx={{
              fontWeight: "bold",
              color: theme.palette.revPrimary.main,
              borderColor: theme.palette.revPrimary.main,
              fontSize: "0.8rem",
              width: { xs: "100%", sm: "auto" },
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                bgcolor: darkMode === true ? "pink" : "black",
                borderColor: darkMode === true ? "white" : "skyblue",
                transform: "scale(1.05)",
              },
            }}
          >
            Play as a guest
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{
              fontSize: "0.8rem",
              width: { xs: "100%", sm: "auto" },
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </Container>
    </Box>
  );

  const renderFeaturesSection = () => (
    <Container sx={{ pt: 0 }} maxWidth="md">
      <Typography
        variant="h4"
        align="center"
        color="text.primary"
        paragraph
        sx={{
          pt: 10,
          mb: 0,
          fontWeight: "bold",
          color: "#fff",
          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
        }}
      >
        Features
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        paragraph
        sx={{
          mt: 2,
          mb: 3,
          color: darkMode === true ? "#fff" : "#fff",
          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
        }}
      >
        Discover Powerful Features
      </Typography>
      <Grid container spacing={4}>
        {cardsData.map((card) => (
          <Grid item key={card.id} xs={6} sm={6} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              elevation={8}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "60%",
                }}
                image={card.imageUrl}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  color="text.primary"
                  sx={{
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  }}
                >
                  {card.title}
                </Typography>
                <Typography
                  gutterBottom
                  variant="subtitle1"
                  component="p"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.6rem", sm: "0.7rem", md: "0.8rem" },
                  }}
                >
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="h4"
        align="center"
        color="text.primary"
        paragraph
        sx={{
          mt: 7,
          mb: 2,
          fontWeight: "bold",
          color: "#fff",
          fontSize: { xs: "1.1rem", sm: "1.3rem", md: "1.5rem" },
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Grid container spacing={0}>
        {FAQData.map((faq, index) => (
          <Grid item key={index} xs={12} sm={12} md={12}>
            <Accordion
              expanded={expanded === index}
              onChange={handleChange(index)}
              sx={{
                margin: { xs: "0.1rem 0", sm: "0.2rem 0", md: "0.25rem 0" },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                id={`faq-${index}`}
                sx={{
                  pl: 0.5,
                }}
              >
                <Typography
                  variant="h6"
                  color="text.primary"
                  sx={{
                    pl: { xs: "0.4rem", sm: "0.6rem", md: "0.8rem" },
                    fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.9rem" },
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: "0.65rem", sm: "0.70rem", md: "0.80rem" },
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

  return (
    <div>
      <RenderBackgroundImage imageSource={Image2} low={20} high={50} />
      <Container>
        <CssBaseline />
        <section className="section1" style={{ height: "100vh" }}>
          {renderHeaderSection()}
        </section>
      </Container>

      <div style={{ position: "relative" }}>
        <RenderBackgroundImage imageSource={Image1} low={20} high={50} />
        <Container>
          <CssBaseline />
          <section className="section2" style={{ height: "100vh" }}>
            {renderFeaturesSection()}
          </section>
          <Footer />
        </Container>
      </div>
    </div>
  );
};

export default Home;
