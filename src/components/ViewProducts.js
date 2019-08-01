import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
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
import Modal from "@material-ui/core/Modal";
import CssBaseline from "@material-ui/core/CssBaseline";
import fire from "firebase";
import { productAction } from "../store/action/productAction";

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
    }
  };
};

class ViewProducts extends Component {
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

  getProduct() {
    const db = fire.firestore();

    db.settings({ timestampsInSnapshots: true });

    db.collection("products")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let product = doc.data();

          const {
            description,
            image,
            name,
            price
          } = product;
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
          // console.log(product)

          // let products = this.props.getProduct(product)
          // // let products = this.state.products;
          // products.push(product);
          // console.log("products: ", products);
          console.log('redux products =>', this.props.products);

        });
      });
  }

  componentDidMount() {
    this.getProduct();
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <AddProducts />
          <Grid container spacing={3}>
            {this.props.products.map((product, i) => {
                  // console.log("products", product);
                  return (
                    <Grid item xs={3}>
                      <Card
                        className={classes.card}
                        key={i}
                        onClick={() => {
                          this.handleOpen(i);
                        }}
                      >
                        <CardActionArea>
                          <img
                            src={product.image}
                            alt="IMG"
                            width="345"
                            height="240"
                          />
                          {/* <CardMedia className={classes.media}/> */}
                          <CardContent
                            style={{
                              height: 100,
                              color: purple
                            }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                              style={{ textTran: "upercase" }}
                            >
                              {product.name.toUpperCase()}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              {product.description
                                .split("")
                                .splice(0, 100)
                                .join("")}
                              .............
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        <CardActions
                          style={{
                            display: "flex",
                            justifyContent: "space-between"
                          }}
                        >
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                              this.goto("/AddCart");
                            }}
                          >
                            BUY: {product.price}
                          </Button>
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => {
                              this.goto("/AddCart");
                            }}
                          >
                            Steam Key: {product.price}
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  );
                })
            }
          </Grid>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.modal}>
            <CssBaseline />

            {this.props.products.map((product, i) =>
              this.state.index === i ? (
                <Card className={classes.card} key={i}>
                  <CardActionArea>
                    <img
                      src={product.image}
                      alt="IMG"
                      width="345"
                      height="240"
                    />
                    {/* <CardMedia className={classes.media}/> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.name.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions
                    style={{
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.goto("/AddCart");
                      }}
                    >
                      BUY: {product.price}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.goto("/AddCart");
                      }}
                    >
                      Steam Key: {product.price}
                    </Button>
                  </CardActions>
                </Card>
              ) : null
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("view Poducts: ", state.products);

  return {
    products: state.products
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getProduct: payload => dispatch(productAction.getProduct(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(ViewProducts)));

// getProduct() {
//   const db = fire.firestore();

//   db.settings({ timestampsInSnapshots: true });

//   db.collection("products")
//     .get()
//     .then(snapshot => {
//       snapshot.docs.forEach(doc => {
//         let product = doc.data();
// const {
//   productDescription,
//   productImage,
//   productName,
//   productPrice
// } = product;
// this.setState({
//   products: [
//     ...this.state.products,
//     {
//       name: productName,
//       description: productDescription,
//       price: productPrice,
//       image: productImage
//     }
//   ]
// });
//       });
//     });
// }

// const {
//   description,
//   image,
//   name,
//   price
// } = product;
// this.setState({
//   products: [
//     ...this.state.products,
//     {
//       name: name,
//       description: description,
//       price: price,
//       image: image
//     }
//   ]

// });
// console.log(doc.id, '=>', doc.data())
