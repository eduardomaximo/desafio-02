import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import TablePagination from "@material-ui/core/TablePagination";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import productApi from "../../helpers/productApi";
import moment from "moment";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { set } from "js-cookie";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableCellAction = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: 100,
  },
  body: {
    fontSize: 14,
    width: 100,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function ProductTable(props) {
  const history = useHistory();

  const useStyles = makeStyles(() => ({
    table: {
      maxWidth: 1110,
      width: "100%",
    },
    productTable: {
      marginTop: 25,
    },
    icons: {
      width: 22,
      height: "auto",
      cursor: "pointer",
    },
    acoesIcons: {
      display: "flex",
      padding: "20%",
      height: "100%",
      minWidth: "125px",
      justifyContent: "space-around",
    },
  }));

  const classes = useStyles();

  const openEdit = (dados) => {
    history.push({
      pathname: "/product-dados",
      state: { create: false, dados },
    });
  };

  const delProduct = async (dados) => {
    if (window.confirm("Deletar o item?")) {
      await productApi.deleteProduct(dados.id);

      props.reset();
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //=================================     Eduardo     =================================

  const [sortBy, setSortBy] = useState("Produto");
  const [isAscending, setIsAscending] = useState(true);

  const TableTitle = (props) => {
    const sortByHandler = () => {
      if (props.title === "Data de Fabricação") {
        setSortBy("Data de Fabricação");
      }
      if (props.title === "Produto") {
        setSortBy("Produto");
      }
      if (props.title === "Produto Perecível") {
        setSortBy("Produto Perecível");
      }
      if (props.title === "Data de Validade") {
        setSortBy("Data de Validade");
      }
      if (props.title === "Preço") {
        setSortBy("Preço");
      }
    };

    const buttonStyle = {
      color: "white",
      backgroundColor: "Transparent",
      border: "none",
    };

    //const sortingOrder = isAscending === true ? <> &#8593; </> : <> &#8595;</>;

    return (
      <button style={buttonStyle} onClick={sortByHandler}>
        {props.title}
      </button>
    );
  };

  const compareProducts = (a, b) => {
    if (sortBy === "Produto") {
      if (a.nome < b.nome) {
        return -1;
      }
      if (a.nome > b.nome) {
        return 1;
      }
      if (a.nome === b.nome) {
        return 0;
      }
    }
    if (sortBy === "Preço") {
      return a.preco - b.preco;
    }
    if (sortBy === "Data de Fabricação") {
      let x = new Date(a.dataFabricacao);
      let y = new Date(b.dataFabricacao);

      return x - y;
    }
    if (sortBy === "Data de Validade") {
      let x = new Date(a.dataValidade);
      let y = new Date(b.dataValidade);

      return x - y;
    }
    if (sortBy === "Produto Perecível") {
      if (a.perecivel < b.perecivel) {
        return -1;
      }
      if (a.perecivel > b.perecivel) {
        return 1;
      }
      if (a.perecivel === b.perecivel) {
        return 0;
      }
    }
  };

  const sortedProducts = props.data.sort(compareProducts);
  const orderedProducts =
    isAscending === true ? sortedProducts : sortedProducts.reverse();

  console.log(orderedProducts);

  //=================================     Eduardo     =================================

  return (
    <Paper>
      <button
        style={{ color: isAscending === true ? "green" : "" }}
        onClick={(e) => {
          setIsAscending(true);
        }}
      >
        Ascending
      </button>
      <button
        style={{ color: isAscending === false ? "green" : "" }}
        onClick={(e) => {
          setIsAscending(false);
        }}
      >
        Descending
      </button>
      <p>Filtrando por {sortBy}</p>
      <TableContainer className={classes.productTable} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">
                <TableTitle title="Produto" />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TableTitle title="Data de Fabricação" />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TableTitle title="Produto Perecível" />
              </StyledTableCell>
              <StyledTableCell align="center">
                <TableTitle title="Data de Validade" />
              </StyledTableCell>
              <StyledTableCell align="right">
                <TableTitle title="Preço" />
              </StyledTableCell>
              <StyledTableCellAction align="center">
                Ações
              </StyledTableCellAction>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderedProducts.map((dados) => (
              <StyledTableRow key={dados.id}>
                <StyledTableCell align="left">{dados.nome}</StyledTableCell>
                <StyledTableCell align="center">
                  {moment(dados.dataFabricacao).format("DD/MM/YYYY")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dados.perecivel === "true" ? (
                    <CheckCircleIcon style={{ color: "#00ff00  " }} />
                  ) : (
                    <CancelIcon style={{ color: "#ff0000  " }} />
                  )}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dados.perecivel === "true" ? (
                    moment(dados.dataValidade).format("DD/MM/YYYY")
                  ) : (
                    <CancelIcon style={{ color: "#ff0000  " }} />
                  )}
                </StyledTableCell>
                <StyledTableCell
                  style={{ minWidth: "100px", maxWidth: "100px" }}
                  align="right"
                >{`R$ ${dados.preco}`}</StyledTableCell>
                <StyledTableCell align="center" className={classes.acoesIcons}>
                  <AiFillEdit
                    onClick={() => openEdit(dados)}
                    className={classes.icons}
                  />
                  <AiTwotoneDelete
                    onClick={() => delProduct(dados)}
                    className={classes.icons}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default ProductTable;
