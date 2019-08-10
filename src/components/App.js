import React, { Component } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { BrowserRouter, Route } from "react-router-dom";
import MyProducts from "./MyProducts";
import AddProducts from "./AddProducts";
import ViewProducts from "./ViewProducts";
import AddCart from "./AddCart";
// import ViewProductsInModal from './ViewProductsInModal'
import fire from "firebase";
import { productAction } from "../store/action/productAction";
import { connect } from "react-redux";

class App extends Component {
  getCurrentUser() {
let props = this.props
    fire.auth().onAuthStateChanged(function(user) {
      if(user){
       props.user(user)
        console.log('user:', user)
      }
      else{
        console.log('noo')
      }
    })






                     //     let userId
                     //     let props = this.props;
                     //     let user = fire.auth().currentUser;
                     //     userId = user.uid
                     //     const db = fire.firestore();
                     //     var docRef = db.collection("sign-up").doc();
                     // console.log('onAuth: ', docRef)
                     //     docRef
                     //       .get()
                     //       .then(function(doc) {
                     //         if (doc.exists) {
                     //           console.log("Document data:", doc.data(userId));
                     //           let currentUser = doc.data();
                     //           props.setUserDataInRedux(currentUser);
                     //         } else {
                     //           // this.props.signIn(docRef);
                     //           // doc.data() will be undefined in this case
                     //           console.log("No such document!");
                     //         }
                     //       })
                     //       .catch(function(error) {
                     //         console.log("Error getting document:", error);
                     //       });
                   }
  getProduct() {
    const db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });

    db.collection("products")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let product = doc.data();

          const { name, description, image, price } = product;
          this.setState({
            products: [
              this.props.getProduct(product),
              {
                name: name,
                description: description,
                price: price,
                image: image
              }
            ]
          });
          // console.log("redux products =>", this.props.products);
        });
      });
  }

  componentDidMount() {
    this.getCurrentUser();
    this.getProduct();
  }

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

const mapStateToProps = state => {
  // console.log("view Poducts: ", state.products);

  return {
    products: state.products,
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProduct: payload => dispatch(productAction.getProduct(payload)),
    setUserDataInRedux: payload =>
      dispatch(productAction.getCurrentUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
