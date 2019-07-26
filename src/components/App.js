import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { BrowserRouter, Route } from "react-router-dom";
import MyProducts from "./MyProducts";
import AddProducts from "./AddProducts";
import ViewProducts from "./ViewProducts";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={ViewProducts} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/AddProducts" component={AddProducts} />
        <Route exact path="/MyProducts" component={MyProducts} />
      </BrowserRouter>
    );
  }
}
