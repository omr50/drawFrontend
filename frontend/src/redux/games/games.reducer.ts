import { Reducer } from "redux";
import GameActionTypes from "./games.types";

interface GameState {
  game: any;
  games: any;
  predictedDrawing?: any;
}
export const INITIAL_GAME_STATE: GameState = {
  game: {},
  games: [],
  predictedDrawing: {},
};

interface GameAction {
  type: string;
  payload: any;
}

const gameReducer: Reducer<GameState, GameAction> = (
  state = INITIAL_GAME_STATE,
  action
) => {
  switch (action.type) {
    case GameActionTypes.FETCH_GAMES:
      return { ...state, games: action.payload };
    case GameActionTypes.ADD_GAME:
      return { ...state, game: action.payload };
    case GameActionTypes.PREDICT_DRAWING:
      return { ...state, predictedDrawing: action.payload };
    default:
      return state;
  }
};

export default gameReducer;
