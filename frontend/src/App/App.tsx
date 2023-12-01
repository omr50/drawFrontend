import ButtonAppBar from "../components/ButtonAppBar";
import AppRoutes from "./AppRoutes";
import { ThemeProviderWrapper } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUserThunk } from "../redux/user/user.actions";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../redux/rootReducer";
import { AnyAction } from "redux";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch() as ThunkDispatch<RootState, null, AnyAction>;
  const handleLogout = () => {
    dispatch(logoutUserThunk());
    navigate("/");
  };

  return (
    <ThemeProviderWrapper>
      <div className="">
        <ButtonAppBar handleLogout={handleLogout} />
        <AppRoutes />
      </div>
    </ThemeProviderWrapper>
  );
}

export default App;
