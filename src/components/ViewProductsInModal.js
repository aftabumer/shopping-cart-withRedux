import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import purple from "@material-ui/core/colors/purple";
import Modal from "@material-ui/core/Modal";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

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
  modal: {
    position: "absolute",
    // width: 400,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1),
    outline: "none"
  },

  card: {
    maxWidth: 345,
    maxHeight: 1000,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },

  root: {
    flexGrow: 1
  }
});

class ViewProductsInModal extends Component {
  state = {
    open: false,
    setOpen: true
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

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {this.props.product.map((products, i) => (
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
                      src={products.image}
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
                      <Typography gutterBottom variant="h5" component="h2">
                        {products.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {products.description
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
                      BUY: {products.price}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.goto("/AddCart");
                      }}
                    >
                      Steam Key: {products.price}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
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

            {this.props.product.map((products, i) =>
              this.state.index === i ? (
                <Card className={classes.card} key={i}>
                  <CardActionArea>
                    <img
                      src={products.image}
                      alt="IMG"
                      width="345"
                      height="240"
                    />
                    {/* <CardMedia className={classes.media}/> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {products.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {products.description}
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
                      BUY: {products.price}
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => {
                        this.goto("/AddCart");
                      }}
                    >
                      Steam Key: {products.price}
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
  console.log("view Poducts: ", state.product);

  return {
    product: state.product
  };
};

export default connect(mapStateToProps)(
  withRouter(withStyles(styles)(ViewProductsInModal))
);
