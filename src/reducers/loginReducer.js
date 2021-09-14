const LOGIN = "login";
const LOGOUT = "logout";

export const reduxLogin = () => ({
  type: LOGIN,
});

export const reduxLogout = () => ({
  type: LOGOUT,
});

const initialState = {
  reduxIsLoggedIn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, reduxIsLoggedIn: true };
    case LOGOUT:
      return { ...state, reduxIsLoggedIn: false };
    default:
      return state;
  }
};
