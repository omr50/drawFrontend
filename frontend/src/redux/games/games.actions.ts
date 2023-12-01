import axios from "axios";
import GameActionTypes from "./games.types";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { AnyAction } from "redux";

interface DrawingData {
  canvas_data: string;
  room_name: string;
  user_id: string;
}

export const addGame = (gameData: any) => ({
  type: GameActionTypes.ADD_GAME,
  payload: gameData,
});

export const fetchGames = (gameData: any) => ({
  type: GameActionTypes.FETCH_GAMES,
  payload: gameData,
});

export const guestPredictDrawing = (gameData: DrawingData) => ({
  type: GameActionTypes.PREDICT_DRAWING,
  payload: gameData,
});

export const userPredictDrawing = (gameData: DrawingData) => ({
  type: GameActionTypes.PREDICT_DRAWING,
  payload: gameData,
});

export const addGameThunk =
  (gameData: any): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    try {
      console.log("ADDGAMETHUNK IS FIRING UP");
      const response = await axios.post(
        // "http://localhost:8080/api/games",
        `https://146.190.114.212:8080/api/games`,
        gameData,
        {
          withCredentials: true,
        }
      );
      dispatch(addGame(response.data));
    } catch (error) {
      console.error(error);
    }
  };

export const fetchGamesThunk =
  (): ThunkAction<void, RootState, null, AnyAction> => async (dispatch) => {
    try {
      console.log("fetchGamesThunk IS FIRING UP");

      const response = await axios.get(
        // "http://localhost:8080/api/games",
        `https://146.190.114.212:8080/api/games`,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchGames(response.data));
    } catch (error) {
      console.error(error);
    }
  };

export const guestPredictDrawingThunk =
  (gameData: DrawingData): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    let retries = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;
    while (retries < MAX_RETRIES) {
      try {
        const response = await axios.post(
          // "http://localhost:8080/api/predict",
          "https://146.190.114.212:8080/api/predict",
          gameData
        );

        dispatch(guestPredictDrawing(response.data));
        return response.data;
      } catch (error) {
        console.error("Error: ", error);
        if (retries < MAX_RETRIES - 1) {
          // console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          retries++;
        } else {
          console.error(`Max retries reached. Giving up.`);
          throw error;
        }
      }
    }
  };

export const userPredictDrawingThunk =
  (gameData: DrawingData): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    let retries = 0;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;
    while (retries < MAX_RETRIES) {
      try {
        const response = await axios.post(
          // "http://localhost:8080/api/predict",
          "https://146.190.114.212:8080/api/predict",
          gameData,
          {
            withCredentials: true,
          }
        );

        dispatch(userPredictDrawing(response.data));
        return response.data;
      } catch (error) {
        console.error("Error: ", error);
        if (retries < MAX_RETRIES - 1) {
          await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
          retries++;
        } else {
          console.error(`Max retries reached. Giving up.`);
          throw error;
        }
      }
    }
  };
