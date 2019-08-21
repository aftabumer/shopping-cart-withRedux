import { connect } from "react-redux";
import React, { Component } from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";
import AddProducts from "./AddProducts";
import purple from "@material-ui/core/colors/purple";
import UpdateProductModal from "./UpdateProductModal";
import Modal from "@material-ui/core/Modal";
import CssBaseline from "@material-ui/core/CssBaseline";
import { productAction } from "../store/action/productAction";
import { notification, Icon } from "antd";
import "antd/dist/antd.css";

import fire, { firestore } from "firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => {
  return {
    card: {
      maxWidth: 345,
      maxHeight: 1000,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    modal: {
      position: "absolute",
      // width: 400,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(1),
      outline: "none"
    },

    media: {
      height: 140
    },
    root: {
      flexGrow: 1
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto"
      }
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    inputRoot: {
      color: "inherit"
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: 200
      }
    }
  };
};

class MyProducts extends Component {
  state = {
    open: false,
    setOpen: true,
    // products: []
  };

  handleOpen = i => {
    this.setState({ open: true, index: i });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  goto = path => {
    this.props.history.push(path);
  };

  myProducts = () => {
    const db = fire.firestore();
    const props = this.props;
    console.log("myProducts: ");
    if (fire.auth().currentUser) {
      console.log("myProducts: ");
      console.log(fire.auth().currentUser.uid);

      db.collection("products")
        .where("userId", "==", fire.auth().currentUser.uid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            props.getMyProducts(doc.data());
          });
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          alert("ops no product Add some product");
        });
    }
  };

  componentDidMount() {
    this.myProducts();
  }

  deleteProduct = (index, product) => {
    // this.props.deleteProduct(index);
    // let id = fire.auth().currentUser
    // let pid = id.uid
    // console.log(pid)
    const db = fire.firestore();
    const props = this.props;
    const id = product.toString();
    db.collection("products")
      .doc(id)
      .delete()
      .then(() => {
        props.deleteProduct(index);
        this.productDeleteSuccess();
        console.log("Document successfully deleted!", product);
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });

    // let documentRef = fire.firestore().doc('products/c9caeb80-c297-11e9-a3fb-3fd6f9896f68');

    // documentRef.delete().then(() => {
    //   console.log('Document successfully deleted.', product);
    // });
  };

  productDeleteSuccess = () => {
    notification.open({
      message: "Product Successfuly Deleted  ",
      icon: <Icon type="check-circle" style={{ color: "#108ee9" }} />
    });
  };
  productDeleteError = type => {
    notification[type]({
      message: "Error in Deleted",
      description: "Please check your Product are avalible or not"
    });
  };
  handleOpen = (product) => {
    this.setState({ open: true, product});
    
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    let tempProducts = [];
    if (fire.auth().currentUser) {
      // console.log(fire.auth().currentUser.uid);
      tempProducts = fire.auth().currentUser.uid
        ? this.props.myProducts
        : alert("noo products");
    }
    // const products=this.props.products.map(res=>{})
    return (
      <div>
        <UpdateProductModal
          open={this.state.open}
          handleClose={this.handleClose}
          product={this.state.product}
          />
        <AddProducts showButton={false} />
          <h1>my own product</h1>
        <div className={classes.root}>
          {/* <button onClick={this.myProducts}>my products</button> */}
          <Grid container spacing={2}>
            {tempProducts.map((product, i) => {
              // console.log(product);
              return (
                <Grid item xs={3}>
                  <Card className={classes.card} key={i}>
                    <Button onClick={()=>{this.handleOpen(product)}}>edit</Button>
                    <CardActionArea>
                      <img
                        src={product.image}
                        alt="IMG"
                        width="280"
                        height="240"
                      />
                      {/* <CardMedia className={classes.media}/> */}
                      <CardContent
                        style={{
                          height: 150,
                          color: purple
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          style={{ textTransform: "uppercase" }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          style={{ textTransform: "capitalize" }}
                        >
                          {product.description
                            .split("")
                            .splice(0, 100)
                            .join("")}
                          <strong> .....</strong>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions
                      style={{
                        display: "flex",
                        justifyContent: "center"
                      }}
                    >
                      <Button
                        size="large"
                        fullWidth
                        color="primary"
                        onClick={() => {
                          this.goto("/AddCart");
                        }}
                      >
                        Buy: ${product.price}
                      </Button>
                    </CardActions>
                    <Button
                      onClick={index => {
                        this.deleteProduct(index, product.uuid);
                      }}
                    >
                      delete
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("view Poducts: ", state.products);

  return {
    products: state.products,
    myProducts: state.myProducts
  };
};
const mapDispatchToProps = dispatch => {
  console.log("dispatch: ", dispatch);
  return {
    addProduct: payload => dispatch(productAction.addProduct(payload)),
    getMyProducts: payload => dispatch(productAction.getMyProducts(payload)),
    deleteProduct: payload => dispatch(productAction.deleteProduct(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(MyProducts)));
