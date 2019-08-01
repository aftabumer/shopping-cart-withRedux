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
  // button: {
  //   display: "flex"
  //   // justifyContent: 'spaceBetween'
  // },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  spacingLeft: {
    marginLeft: theme.spacing(10)
  },
  spacingRight: {
    marginRight: theme.spacing(2)
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
      // confirmPassword: ""
    };
  }

  handleOnChnage = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // addSignUpDataInFireStore = event => {
  //   event.preventDefault();

  //   const db = fire.firestore();

  //   db.settings({
  //     timestampsInSnapshots: true
  //   });

  //   db.collection("sign-up")
  //     .doc()
  //     .set({
  //       firstName: this.state.firstName,
  //       lastName: this.state.lastName,
  //       email: this.state.email,
  //       password: this.state.password
  //       // editStatus:this.state.editStatus
  //     });

  //   this.signUp(event);
  // };

  signUp = event => {
    event.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        const userId = response.user.uid;
        console.log("userId: ", userId);
        const db = fire.firestore();

        db.settings({
          timestampsInSnapshots: true
        });

        db.collection("sign-up")
          .doc(userId)
          .set({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
            // editStatus:this.state.editStatus
          });
        alert("SuccessFull Sign Up");
        this.goto("/");
      })
      .catch(error => {
        alert("Please fill correct Email & Password", error);
        console.log("error: ", error);
      });

    // const user = fire.auth().currentUser;
    // user
    // .sendEmailVerification()
    // .then(() => {
    //   alert("verify plx");
    // })
    // .catch(error => {
    //   console.log(error);
    // });
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
            {/* <TextField
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
            /> */}
          </CardContent>
          <CardActions>
            {/* <div style={{ display: "flex", justifyContent: "flex-start" }}> */}
            <div className={classes.spacingRight}>
              <Button variant="contained" color="primary" onClick={this.signUp}>
                Sign Up
              </Button>
            </div>
            <div className={classes.spacingLeft}>
              <Button
                color="secondary"
                onClick={() => {
                  this.goto("/");
                }}
              >
                I have already account
              </Button>
            </div>
            {/* </div> */}
          </CardActions>
        </Card>
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(SignUp));
