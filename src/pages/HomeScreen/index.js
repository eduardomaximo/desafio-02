import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Titulo } from "./styled";
import { doLogout } from "../../helpers/AuthHandler";

import { useDispatch, useSelector } from "react-redux";
import { reduxLogout } from "../../reducers/loginReducer";
import { onProduct, onProductDados } from "../../reducers/onPageReducer";

export default () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(onProduct());
    history.push("/product");
  };
  const handleLogout = () => {
    if (window.confirm("Deseja mesmo sair?")) {
      dispatch(reduxLogout());
      doLogout();
      window.location.href = "/login";
    }
  };

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Titulo>React - Desafio 02</Titulo>
        <p style={{ marginTop: "20px", marginBottom: "20px" }}>
          Selecione no Sidebar o Menu <b>Product</b>
        </p>
        <div style={{ display: "flex", justifyContent: "space-arround" }}>
          <button
            style={{
              padding: "10px 20px",
              color: "#fff",
              backgroundColor: "#3f51B5",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "auto",
            }}
            onClick={handleButtonClick}
          >
            Ir para Tela de Produto
          </button>

          <button
            style={{
              padding: "10px 20px",
              color: "#fff",
              border: "1px solid #3f51B5",
              backgroundColor: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
              margin: "auto",
              color: "#3f51B5",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </Container>
  );
};
