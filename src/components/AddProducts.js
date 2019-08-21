import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import purple from "@material-ui/core/colors/purple";
import Modal from "@material-ui/core/Modal";
import List from "@material-ui/icons/List";
import ExitToApp from "@material-ui/icons/ExitToApp";
import PlayListAdd from "@material-ui/icons/PlaylistAdd";
import { withRouter } from "react-router-dom";
import fire from "../config/FireBase";
import { productAction } from "../store/action/productAction";
import { connect } from "react-redux";
import { notification, Icon } from "antd";
import "antd/dist/antd.css";
import uuid from "uuid";

// import InputAdornment from "@material-ui/core/InputAdornment";

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
//   }

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  main: {
    width: "auto",
    display: "flex", // Fix IE 11 issue.
    flexDirection: "column",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },

  modal: {
    position: "absolute",
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    margin: theme.spacing(1)
    
  },
  textField: {
    marginRight: theme.spacing(1)
  }
});

const theme = createMuiTheme({
  palette: {
    primary: purple
  }
});
class AddProducts extends Component {
  state = {
    name: "",
    description: "",
    image: "",
    price: "",
    userId: "",
    uuid: '',
    open: false,
    setOpen: true
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  goto = path => {
    this.props.history.push(path);
  };

  signOut = event => {
    event.preventDefault();

    fire
      .auth()
      .signOut()
      .then(() => {
        alert("SuccessFull Sign Out ");
        this.goto("/SignIn");
      })
      .catch(error => {
        console.log(error);
      });
  };

  addProduct = () => {
    let { name, description, image, price } = this.state;
    this.props.addProduct({ name, description, image, price });
    const uuid = require('uuid/v1')
    const db = fire.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    let userId = fire.auth().currentUser;
    let pid = uuid()
    db.collection("products")
      .doc(pid)
      .set({
        userId: userId.uid,
        name: name,
        description: description,
        image: image,
        price: price,
        uuid: pid
      })
      .then(() => {
        this.productAddSuccess()

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
      })
      .catch(error => {
        this.productAddError()
      });

    this.setState({
      name: "",
      description: "",
      image: "",
      price: ""
    });
    this.handleClose();
  };

  // myProducts = () => {
  //   const db = fire.firestore();
  //   const props = this.props;
  //   console.log(fire.auth().currentUser.uid);
  //   db.collection("products")
  //     .where("userId", "==", fire.auth().currentUser.uid)
  //     .get()
  //     .then(function(querySnapshot) {
  //       querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log(doc.id, " => ", doc.data());
  //         props.getMyProducts(doc.data());
  //       });
  //     })
  //     .catch(function(error) {
  //       console.log("Error getting documents: ", error);
  //       alert('ops no product Add some product')
  //     });
  // };

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  productAddSuccess = () => {
    notification.open({
      message: "Product Successfuly Added  ",
      icon: <Icon type="check-circle" style={{ color: "#108ee9" }} />
    });
  };
  productAddError = type => {
    notification[type]({
      message: "Add Product Error ",
      description: "Please check your Product details"
    });
  };



  render() {
    const { classes, showButton } = this.props;
    const isEnabled =
      this.state.name.length > 0 &&
      this.state.image.length > 0 &&
      this.state.description.length > 0 &&
      this.state.price.length > 0;

    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: theme.spacing(2)
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
          {showButton ? (
              <Button
                variant="contained"
                color="default"
                disabled={!this.state.setOpen}
                className={classes.button}
                onClick={() => this.goto("/MyProducts")}
              >
                my product
                <List className={classes.rightIcon} />
                </Button>
          ) : null}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginLeft: theme.spacing(3)
            }}
          >
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={this.handleOpen}
            >
              Add Product
              <PlayListAdd className={classes.rightIcon} />
            </Button>

            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={this.signOut}
            >
              Sign Out
              <ExitToApp className={classes.rightIcon} />
            </Button>
          </div>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.modal}>
            <main className={classes.main}>
              <CssBaseline />
              <div style={{ display: "flex", justifyContent: "center " }}>
                <Avatar className={classes.avatar}>
                  <i class="material-icons">event_note</i>
                </Avatar>
              </div>
              <Typography
                component="h1"
                variant="h5"
                style={{ textAlign: "center" }}
              >
                Add Product
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.textField}
                      label="Product Name"
                      type="text"
                      placeholder="Product name"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleOnChange}
                      variant="outlined"
                      id="mui-theme-provider-outlined-input"
                      fullWidth
                    />
                  </MuiThemeProvider>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Product Description"
                      type="text"
                      placeholder="Product Description"
                      name="description"
                      multiline
                      rows="2"
                      value={this.state.description}
                      onChange={this.handleOnChange}
                      className={classes.textField}
                      variant="outlined"
                      fullWidth
                    />
                  </MuiThemeProvider>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <MuiThemeProvider theme={theme}>
                    <TextField
                      className={classes.textField}
                      label="Product Image"
                      type="text"
                      placeholder="Product Image"
                      name="image"
                      value={this.state.image}
                      onChange={this.handleOnChange}
                      variant="outlined"
                      id="mui-theme-provider-outlined-input"
                      fullWidth
                    />
                  </MuiThemeProvider>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <TextField
                    id="outlined-adornment-amount"
                    className={classes.textField}
                    variant="outlined"
                    label="Product Amount"
                    type="text"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleOnChange}
                    placeholder="Product Amount"
                    fullWidth
                  />
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  disabled= {!isEnabled}
                  fullWidth={true}
                  className={classes.form}
                  onClick={this.addProduct}
                >
                  Add Product
                </Button>
              </form>
            </main>
          </div>
        </Modal>
      </div>
    );
  }
}

AddProducts.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  // console.log("view Poducts: ", state.products);

  return {
    products: state.products,
    myProducts: state.myProducts
  };
};
const mapDispatchToProps = dispatch => {
  // console.log("dispatch: ", dispatch);

  return {
    addProduct: payload => dispatch(productAction.addProduct(payload)),
    getMyProducts: payload => dispatch(productAction.getMyProducts(payload)),    
    getMyProducts: payload => dispatch(productAction.getMyProducts(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(AddProducts)));
