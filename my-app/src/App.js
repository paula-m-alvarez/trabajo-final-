import React, { Component } from 'react';
// import logo from './logo.svg';
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.scss';
import "./App.css";
import Navbar from "./Navbar";
import Products from "./Products" ;
import ProductDetail from "./ProductDetail" ;

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Navbar> </Navbar>
            
            <Route exact path= '/items' component = {Products}> </Route>
            <Route exact path= '/items/:id' component = { ProductDetail } > </Route >
          </div >
        </BrowserRouter >
      </div >
    );
  }
}

export default App;
