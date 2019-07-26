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

const styles = theme => {
  return {
    card: {
      maxWidth: 345,
      maxHeight: 400,
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary
    },
    media: {
      height: 140
    },
    root: {
      flexGrow: 1
    },
    rightIcon: {
      marginLeft: theme.spacing(1)
    },
    button: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3)
    }
  };
};

class ViewProducts extends Component {
  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AddProducts />
        <Grid container spacing={3}>
          {this.props.product.map((products, i) => (
            <Grid item xs={3}>
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
                <CardActions>
                  <Button size="small" color="primary">
                    BUY: {products.price}
                  </Button>
                  <Button size="small" color="primary">
                    Steam Key: {products.price}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
  withRouter(withStyles(styles)(ViewProducts))
);
