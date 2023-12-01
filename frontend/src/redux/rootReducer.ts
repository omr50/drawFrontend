import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import gamesReducer from "./games/games.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  games: gamesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
