import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import ProtectedRoute from "../components/ProtectedRoute";
import MultiplayerMode from "../components/MultiplayerMode";
import SinglePlayerMode from "../components/SinglePlayerMode";
import Dashboard from "../pages/Dashboard";
import { RootState } from "../redux/rootReducer";
import { useSelector } from "react-redux";
import AvatarPicker from "../components/AvatarPicker";
import UserHomePage from "../pages/UserHomePage";
import Settings from "../pages/Settings";
const AppRoutes = () => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/playSmode" element={<SinglePlayerMode />} />
      <Route path="/playMmode" element={<MultiplayerMode />} />
      {/* <Route path="/test" element={<Dash />} /> */}

      <Route
        path="/home"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <UserHomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings/avatars"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AvatarPicker />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
