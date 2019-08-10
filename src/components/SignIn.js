import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import fire from "../config/FireBase";
import { productAction } from "../store/action/productAction";
import { connect } from "react-redux";
import { Button, notification, Icon } from 'antd';
import "antd/dist/antd.css";

const styles = theme => ({
  root: {
    backgroundImage: `url(https://visme.co/blog/wp-content/uploads/2017/07/50-Beautiful-and-Minimalist-Presentation-Backgrounds-029.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "100vh",
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    position: "absolute"
  },
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
    alignItems: "center",
    backgroundColor: "#c4def6"
  },
  cardContext: {
    padding: "5px 0px 5px 0px"
  },

  avatar: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main
  },
  button: {
    display: "flex"
    // justifyContent: 'spaceBetween'
  },
  spacing: {
    marginLeft: theme.spacing(22)
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      iconLoading: false
    };
  }

  handleOnChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  enterIconLoading = () => {
    this.setState({ iconLoading: true });
  };

  signInSuccess = () => {
    notification.open({
      message: 'Sign In Success ',
      icon: <Icon type="check-circle" style={{ color: '#108ee9' }} />,
    });
  };
  signInError = type => {
    notification[type]({
      message: 'Sign In Error ',
      description:
        'Please check your Email and Password',
    });
  };

  signIn = event => {
    let userId;
    event.preventDefault();
    let props = this.props;
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(response => {
        // alert("SuccessFull Sign In");
        // this.props.senduserId(user)
        // let user = this.props.user
        // user.fire.firestore().userId
        this.signInSuccess()

        userId = response.user.uid;
        console.log("userId =>", userId);

        // let user = fire.auth().currentUser;
        // console.log('user',user.uid);
        const db = fire.firestore();
        var docRef = db.collection("sign-up").doc(userId);

        docRef
          .get()
          .then(function(doc) {
            if (doc.exists) {
              console.log("Document data:", doc.data());
              let currentUser = doc.data();

              props.setUserDataInRedux(currentUser);
            } else {
              // this.props.signIn(docRef);
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(function(error) {
            console.log("Error getting document:", error);
          });

        // const db = fire.firestore()
        // db.collection("sign-up")
        // .get()
        // .then(snapshot => {
        //   snapshot.forEach(doc => {
        //       let user= doc.data()
        //     const{firstName, lastName, email} = user;
        //     this.setState({
        //       users: [
        //         this.props.signUp(user),
        //         {
        //           firstName: firstName,
        //           lastName: lastName,
        //           email: email
        //         }
        //       ]
        //     });

        //   })
        // })

        this.goto("/ViewProducts");
      })
      .catch(error => {
        this.setState({ iconLoading: false });
        this.signInError('warning')
        // alert("Please fill correct Email & Password", error);
        this.setState({email: '', password: ''})

        console.log("error: ", error);
      });
  };

  goto = path => {
    this.props.history.push(path);
  };

  render() {
    const { classes } = this.props;
    // const { email, password } = this.state;
    const isEnabled =
      this.state.email.length > 0 && this.state.password.length > 0;

    return (
      <div className={classes.root}>
        {/* <img src="https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/EVeDgMMCximbyooji/red-3d-hearts-flying-valentines-day-background-full-hd_rlgkv7hxwl_thumbnail-full01.png" alt="Cinque Terre" width="100%" height= '650px' position= 'absolute'  /> */}

        <Card className={classes.card}>
          <Avatar className={classes.avatar} style={{ justifyItems: "center" }}>
            <i class="material-icons">lock</i>
          </Avatar>
          <Typography
            variant="h5"
            component="h2"
            style={{ textAlign: "center" }}
          >
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
              value={this.state.email}
              onChange={this.handleOnChange}
              fullWidth
            />
            <TextField
              id="filled-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              name="password"
              autoComplete="current-password"
              margin="normal"
              variant="filled"
              value={this.state.password}
              onChange={this.handleOnChange}
              fullWidth
            />
          </CardContent>
          <CardActions>
            <div
              className={classes.button}
              style={{ justifyContent: "space-between" }}
            >
              <div style={{ display: "flex" }}>
                {/* <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={this.signIn}
                >
                  Sign In
                </Button> */}

                <Button
                  type="primary"
                  icon="login"
                  disabled={!isEnabled}
                  loading={this.state.iconLoading}
                  onClick={e => {
                    this.enterIconLoading();
                    this.signIn(e);
                  }}
                >
                  Sign In
                </Button>
              </div>

              <div className={classes.spacing} style={{ display: "flex" }}>
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDataInRedux: payload => dispatch(productAction.getCurrentUser(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(styles)(SignIn)));
