import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { BrowserRouter, Route } from "react-router-dom";
import MyProducts from "./MyProducts";
import AddProducts from "./AddProducts";
import ViewProducts from "./ViewProducts";
import AddCart from "./AddCart";
// import ViewProductsInModal from './ViewProductsInModal'

class App extends Component {
 

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/ViewProducts" component={ViewProducts} />
        <Route exact path="/" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/AddProducts" component={AddProducts} />
        <Route exact path="/MyProducts" component={MyProducts} />
        <Route exact path="/AddCart" component={AddCart} />
        {/* <Route exact path="/ViewProductsInModal" component={ViewProductsInModal} /> */}
      </BrowserRouter>
    );
  }
}

export default App;
