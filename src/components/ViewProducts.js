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
import TextField from "@material-ui/core/TextField";
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
      maxWidth: 400,
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
    search: ""
    // products: []
  };

  onChange = event => {
    this.setState({ search: event.target.value });
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

  // search = () => {
  //   const {search} = this.state
  //   const products = this.props.products
  //   console.log(products)
  //   const filterProducts = this.props.products.filter( product => {
  //     return product.name.toUpperCase().indexOf( search.toLowerCase()) !== -1
  //   })

  // console.log(filterProducts)
  // }
  render() {
    const { classes } = this.props;

    let newDataArray = this.props.products.filter(product => {
      return (
        product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });
    // let tempProducts=[];
    // if(fire.auth().currentUser){
    //   console.log(fire.auth().currentUser.uid)
    //   tempProducts = (fire.auth().currentUser.uid)? this.props.myProducts:this.props.products

    // }
    // const products=this.props.products.map(res=>{})
    return (
      <div>
        <div className={classes.root}>
          <AddProducts showButton={true} />
          {/* <input label="Search Product" onChange={this.onChange} /> */}
          <div
            style={{ display: "flex", justifyContent: "center", flex: "glow" }}
          >
            <TextField
              id="standard-full-width"
              style={{ marginBottom: "20px", width: "50%" }}
              placeholder="Search Product"
              onChange={this.onChange}
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
            />
            <i
              class="material-icons"
              style={{ padding: 0, marginTop: "20px", marginLeft: "5px" }}
            >
              search
            </i>
          </div>

          <Grid container spacing={2}>
            {newDataArray.map((product, i) => {
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

            {this.props.products.map((product, i) =>
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
