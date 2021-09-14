const ON_LOGIN = "onLogin";
const ON_HOMESCREEN = "onHomescreen";
const ON_PRODUCT = "onProduct";
const ON_PRODUCTDADOS = "onProductDados";

export const onLogin = () => ({
  type: ON_LOGIN,
});

export const onHomescreen = () => ({
  type: ON_HOMESCREEN,
});

export const onProduct = () => ({
  type: ON_PRODUCT,
});

export const onProductDados = () => ({
  type: ON_PRODUCTDADOS,
});

const initialState = {
  isOnPage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ON_LOGIN:
      return { ...state, isOnPage: "onLoginPage" };
    case ON_HOMESCREEN:
      return { ...state, isOnPage: "onHomescreenPage" };
    case ON_PRODUCT:
      return { ...state, isOnPage: "onProductPage" };
    case ON_PRODUCTDADOS:
      return { ...state, isOnPage: "onProductDadosPage" };
    default:
      return state;
  }
};
