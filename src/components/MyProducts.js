import { connect } from "react-redux";
import React, { Component } from "react";
import {fade, withStyles } from "@material-ui/core/styles";
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
import { productAction } from "../store/action/productAction";

import fire from "firebase";

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
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
  };
};

class MyProducts extends Component {
  state = {
    open: false,
    setOpen: true
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
    console.log('myProducts: ')
    if (fire.auth().currentUser) {
      console.log('myProducts: ')
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

  deleteProduct = () => {
    const db = fire.firestore()
    db.collection("products").doc("userId").delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  }

  render() {
    const { classes } = this.props;
    let tempProducts = [];
    if (fire.auth().currentUser) {
      console.log(fire.auth().currentUser.uid);
      tempProducts = fire.auth().currentUser.uid
        ? this.props.myProducts
        : alert("noo products");
    }
    // const products=this.props.products.map(res=>{})
    return (
      <div>
        <AddProducts showButton={false} />
        <div className={classes.root}>
          {/* <button onClick={this.myProducts}>my products</button> */}
          <Grid container spacing={2}>
            {tempProducts.map((product, i) => {
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
                          .......
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
                  </Card>
                </Grid>
              );
            })}
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

            {tempProducts.map((product, i) =>
              this.state.index === i ? (
                <Card className={classes.card} key={i}>
                  <CardActionArea>
                    <img
                      src={product.image}
                      alt="IMG"
                      width="280"
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
    products: state.products,
    myProducts: state.myProducts
  };
};
const mapDispatchToProps = dispatch => {
  console.log("dispatch: ", dispatch);
  return {
    addProduct: payload => dispatch(productAction.addProduct(payload)),
    getMyProducts: payload => dispatch(productAction.getMyProducts(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(MyProducts)));
