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
import fire from "../config/FireBase";

const styles = theme => ({
  card: {
    margin: "0 auto",
    position: "relative",
    top: "25%",
    left: 0,
    right: 0,
    bottom: "25%",
    maxWidth: "500px",
    height: "50%",
    display: "flex",
    justifyItems: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  cardContext: {
    padding: "5px 50px 5px 50px"
  },

  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    display: "flex"
    // justifyContent: 'spaceBetween'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  handleOnChnage = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  signUp = event => {
    event.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(
        this.state.email,
        this.state.password,
      )
      .then(userId => {
      this.goto("/");

      })
      .then(userId => {
        console.log("userId: ", userId);
      })
      .catch(error => {
        console.log("error: ", error);
      });

  };

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const { classes } = this.props;
    return (
      <div style={{ paddingTop: "50px" }}>
        <Card className={classes.card}>
          <Avatar className={classes.avatar} style={{ justifyItems: "center" }}>
            <i class="material-icons">lock</i>
          </Avatar>
          <Typography
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Sign Up
          </Typography>
          <CardContent className={classes.cardContext}>
            <TextField
              id="filled-required"
              label="First Name"
              className={classes.textField}
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleOnChnage}
              margin="normal"
              variant="filled"
              fullWidth
            />
            <TextField
              id="filled-required"
              label="Last Name"
              className={classes.textField}
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleOnChnage}
              margin="normal"
              variant="filled"
              fullWidth
            />
            <TextField
              id="filled-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleOnChnage}
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
              name="password"
              value={this.state.password}
              onChange={this.handleOnChnage}
              autoComplete="current-password"
              margin="normal"
              variant="filled"
              fullWidth
            />
            <TextField
              id="filled-password-input"
              label="Confirm Password"
              className={classes.textField}
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleOnChnage}
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
                  onClick={this.signUp}
                >
                  Sign Up
                </Button>
              </div>
              <div style={{ display: "flex" }}>
                <Button
                  color="secondary"
                  onClick={() => {
                    this.goto("/signIn");
                  }}
                >
                  I have already account
                </Button>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(SignUp));
