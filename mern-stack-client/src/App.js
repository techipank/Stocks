import React from 'react';
import './App.css';
import { Provider } from "react-redux";
//import PostMessages from "./components/PostMessages";
import StockMaster from "./components/StockMaster";
import { store } from "./actions/store";
import { Container, AppBar, Typography } from "@material-ui/core";
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="lg">       
        <StockMaster />
      </Container>
    </Provider>
  );
}

export default App;
