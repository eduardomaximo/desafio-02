import React, { useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import RouterHandler from "./components/RouterHandler";

import Sidebar from "./components/Sidebar/Sidebar";

import {
  Container,
  PageBody,
  Header,
  Footer,
  MainContainer,
} from "./AppStyled";
import "./App.css";
import HomeScreen from "./pages/HomeScreen";
import Poduct from "./pages/Product";
import ProductDados from "./pages/ProductDados";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import {
  onLogin,
  onHomescreen,
  onProduct,
  onProductDados,
} from "./reducers/onPageReducer";

export default () => {
  //const name = useSelector(state => state.user.name);
  const onPage = useSelector((state) => state.onPageReducer.isOnPage);
  const dispatch = useDispatch();
  const currentUrl = window.location.href;

  useEffect(() => {
    switch (currentUrl) {
      case "http://localhost:3000/login":
        return dispatch(onLogin());
      case "http://localhost:3000/":
        return dispatch(onHomescreen());
      case "http://localhost:3000/product":
        return dispatch(onProduct());
      case "http://localhost:3000/product-dados":
        return dispatch(onProductDados());
    }
    console.log("User on page: ", onPage);
  }, [currentUrl, onPage]);

  console.log(onPage);

  return (
    <BrowserRouter>
      <RouterHandler exact path="/login">
        <Login />
      </RouterHandler>

      <Container>
        <MainContainer>
          <Header>
            <Sidebar />
            React - Desafio 02
          </Header>
        </MainContainer>
        <PageBody>
          <Switch>
            <RouterHandler private exact path="/">
              <HomeScreen />
            </RouterHandler>
            <RouterHandler private path="/product">
              <Poduct />
            </RouterHandler>
            <RouterHandler private path="/product-dados">
              <ProductDados />
            </RouterHandler>
          </Switch>
        </PageBody>
        <Footer>React - Desafio 02</Footer>
      </Container>
    </BrowserRouter>
  );
};
