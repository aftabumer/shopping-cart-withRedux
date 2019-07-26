import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";

const styles = theme => ({
  card: {
    margin: "0 auto",
    position: "absolute",
    top: "25%",
    left: 0,
    right: 0,
    bottom: "25%",
    maxWidth: "500px",
    maxHeight: "50%",
    display: "flex",
    justifyItems: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  cardContext: {
    padding: "5px 0px 5px 0px"
  },

  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    display: "flex"
    // justifyContent: 'spaceBetween'
  }
});

class SignIn extends Component {
  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <Avatar className={classes.avatar} style={{ justifyItems: "center" }}>
          <i class="material-icons">lock</i>
        </Avatar>
        <Typography variant="h5" component="h2" style={{ textAlign: "center" }}>
          Sign In
        </Typography>
        <CardContent className={classes.cardContext}>
          <TextField
            id="filled-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="filled"
            fullWidth
          />
          <TextField
            id="filled-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="filled"
            fullWidth
          />
        </CardContent>
        <CardActions>
          <div
            className={classes.button}
            style={{ justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  this.goto("/AddProducts");
                }}
              >
                Sign In
              </Button>
            </div>
            <div style={{ display: "flex" }}>
              <Button
                color="secondary"
                onClick={() => {
                  this.goto("/SignUp");
                }}
              >
                I want to register
              </Button>
            </div>
          </div>
        </CardActions>
      </Card>
    );
  }
}
export default withRouter(withStyles(styles)(SignIn));