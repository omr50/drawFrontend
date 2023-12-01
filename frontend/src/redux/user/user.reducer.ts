import UserActionTypes from "./user.types";

interface UserState {
  user: any;
  isLoggedIn: boolean;
}

const INITIAL_USER_STATE: UserState = {
  user: {},
  isLoggedIn: false,
};

interface UserAction {
  type: string;
  payload: any;
}

const userReducer = (
  state: UserState = INITIAL_USER_STATE,
  action: UserAction
) => {
  switch (action.type) {
    case UserActionTypes.FETCH_USER:
      return { ...state, user: action.payload };
    case UserActionTypes.UPDATE_USER:
    case UserActionTypes.SIGNUP_USER:
    case UserActionTypes.LOGIN_USER:
    case UserActionTypes.LOGIN_GOOGLE:
      return { ...state, user: action.payload };
    case UserActionTypes.LOGOUT_USER:
      return { ...state, user: {} };
    case UserActionTypes.DELETE_USER:
      return { ...state, user: {} };
    case UserActionTypes.SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
