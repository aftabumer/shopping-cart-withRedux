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
import List from "@material-ui/icons/List";
import ExitToApp from "@material-ui/icons/ExitToApp";
import PlayListAdd from "@material-ui/icons/PlaylistAdd";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { productAction } from "../store/action/productAction";
import fire from "../config/FireBase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}
const db = fire.firestore();

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

class UpdateProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      image: "",
      price: "",
      userId: "",
      uuid: "",
      open: false,
      setOpen: true
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.product !== this.props.product) {
      let product = this.props.product;

      this.setState({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        userId: product.userId,
        uuid: product.uuid
      });
    }
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  abcd = () => {
    db.collection("products")
      .doc('4H09lrUw4rAkezwCubCk')
      .update({
        description: 'adsadsadsdsadsadasdsadsadsadsadas_11'
      }).then(()=>{
        alert('updated product')
      }).catch(error => {
        alert('eorro on update => ', error)
      })

  }

  updateProduct = () => {
    let { name, description, image, price, userId, uuid } = this.state;
    let product = this.props.product;
    console.log(product.uuid)
    db.collection("products")
      .doc(product.uuid)
      .set({
        name: name,
        userId: userId,
        description: description,
        image: image,
        price: price,
        uuid: uuid
      }).then(()=>{
        console.log(name,userId,description,image,price,uuid)
        alert('updated product')
      }).catch(error => {
        alert('eorro on update => ', error)
      })

      this.setState({
        name: "",
        description: "",
        image: "",
        price: ""
      });
     this.props.handleClose()
  };

  render() {
    const { open, handleClose, product, classes } = this.props;
    const { name, description, image, price } = this.state;
    const isEnabled =
      this.state.name.length > 0 &&
      this.state.image.length > 0 &&
      this.state.description.length > 0 &&
      this.state.price.length > 0;

    // let tempProducts = [];
    // if (fire.auth().currentUser) {
    //   // console.log(fire.auth().currentUser.uid);
    //   tempProducts = fire.auth().currentUser.uid
    //     ? this.props.myProducts && console.log('products => ',this.props.myProducts)
    //     : alert("noo products");
    // }
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        product={product}
        // product = {tempProducts}
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
              Update Product
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
                    value={name}
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
                    value={description}
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
                    value={image}
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
                  value={price}
                  onChange={this.handleOnChange}
                  placeholder="Product Amount"
                  fullWidth
                />
              </FormControl>

              <Button
                variant="contained"
                color="secondary"
                disabled={!isEnabled}
                fullWidth={true}
                className={classes.form}
                onClick={()=>{this.updateProduct()}}
              >
                Update Product
              </Button>
            </form>
          </main>
        </div>
      </Modal>
    );
  }
}
UpdateProductModal.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    products: state.products,
    myProducts: state.myProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProduct: payload => dispatch(productAction.updateProduct(payload))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(UpdateProductModal));
