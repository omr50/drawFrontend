import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../rootReducer";
import { AnyAction } from "redux";
import UserActionTypes from "./user.types";

export const fetchUser = (userData: any) => ({
  type: UserActionTypes.FETCH_USER,
  payload: userData,
});

export const updateUser = (updateData: object) => ({
  type: UserActionTypes.UPDATE_USER,
  payload: updateData,
});

export const signupUser = (userData: object) => ({
  type: UserActionTypes.SIGNUP_USER,
  payload: userData,
});

export const loginUser = (userData: object) => ({
  type: UserActionTypes.LOGIN_USER,
  payload: userData,
});

export const loginGoogle = (userData: object) => ({
  type: UserActionTypes.LOGIN_GOOGLE,
  payload: userData,
});

export const logoutUser = () => ({
  type: UserActionTypes.LOGOUT_USER,
});

export const deleteUser = () => ({
  type: UserActionTypes.DELETE_USER,
});

export const setLoginStatus = (isLoggedIn: boolean) => ({
  type: UserActionTypes.SET_LOGIN_STATUS,
  payload: isLoggedIn,
});

export const fetchUserThunk =
  (): ThunkAction<void, RootState, null, AnyAction> => async (dispatch) => {
    try {
      console.log("FETCHUSERTHUNK FIRING UP");
      const response = await axios.get(
        // `http://localhost:8080/auth/me`,
        `https://146.190.114.212:8080/auth/me`,
        {
          withCredentials: true,
        }
      );
      dispatch(fetchUser(response.data || {}));
    } catch (error) {
      console.error(error);
    }
  };

export const updateUserThunk =
  (userData: any): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    try {
      console.log("UPDATEUSERTHUNK FIRING UP");
      const response = await axios.put(
        // `http://localhost:8080/api/me`,
        `https://146.190.114.212:8080/api/me`,
        userData,
        {
          withCredentials: true,
        }
      );

      dispatch(updateUser(response.data));
    } catch (error) {
      console.error(error);
    }
  };

export const signupUserThunk =
  (userData: any): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    try {
      console.log("SIGNUPUSERTHUNK FIRING UP");
      const response = await axios.post(
        // `http://localhost:8080/auth/signup`,
        `https://146.190.114.212:8080/auth/signup`,

        userData,
        { withCredentials: true }
      );
      console.log("here:", response);
      dispatch(signupUser(response.data));
      dispatch(setLoginStatus(true));
    } catch (error) {
      dispatch(setLoginStatus(false));
      console.error(error);
      throw error;
    }
  };

export const loginUserThunk =
  (userData: any): ThunkAction<void, RootState, null, AnyAction> =>
  async (dispatch) => {
    try {
      console.log("LOGINUSERTHUNK FIRING UP");

      const response = await axios.post(
        // `http://localhost:8080/auth/login`,
        "https://146.190.114.212:8080/auth/login",

        userData,
        { withCredentials: true }
      );
      dispatch(loginUser(response.data));
      dispatch(setLoginStatus(true));
    } catch (error) {
      dispatch(setLoginStatus(false));
      console.error(error);
      throw error;
    }
  };

export const logoutUserThunk =
  (): ThunkAction<void, RootState, null, AnyAction> => async (dispatch) => {
    try {
      console.log("LOGOUTUSERTHUNK FIRING UP");

      await axios.get(
        // `http://localhost:8080/auth/logout`,
        `https://146.190.114.212:8080/auth/logout`,
        {
          withCredentials: true,
        }
      );
      dispatch(logoutUser());
      dispatch(setLoginStatus(false));
    } catch (error) {
      console.error(error);
    }
  };

export const deleteUserThunk =
  (): ThunkAction<void, RootState, null, AnyAction> => async (dispatch) => {
    try {
      await axios.delete(
        // `http://localhost:8080/api/me`,
        `https://146.190.114.212:8080/api/me`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteUser());
      dispatch(setLoginStatus(false));
    } catch (error) {
      console.error(error);
    }
  };
