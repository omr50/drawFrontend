import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserThunk } from "../redux/user/user.actions";
import {
  Grid,
  Button,
  CssBaseline,
  IconButton,
  Container,
} from "@mui/material";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/rootReducer";
import { AnyAction } from "redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import avatars from "./RenderAvatars";

const Avatar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch() as ThunkDispatch<RootState, null, AnyAction>;

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (avatar: string) => {
    const newAvatar = {
      image: avatar,
    };

    try {
      await dispatch(updateUserThunk(newAvatar));
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CssBaseline />
      <Container sx={{ pt: 20 }}>
        <IconButton onClick={handleBack}>
          <ArrowBackIcon sx={{ fontSize: 32 }} />
        </IconButton>
        <Grid container spacing={2} justifyContent="center" sx={{ pt: 5 }}>
          {avatars.map((avatar, index) => (
            <Grid item key={index} xs="auto" sm="auto" md="auto">
              <div className="avatar-element">
                <Button
                  onClick={() => handleSubmit(avatar)}
                  className="avatar-submit-btn"
                  sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    "&:hover": {
                      border: "2px solid #007BFF",
                      transform: "scale(1.05)",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  <img
                    key={index}
                    src={avatar}
                    alt={`user profile ${index + 1}`}
                    className="avatar-image"
                    style={{
                      width: "15rem",
                      height: "15rem",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </Button>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Avatar;
