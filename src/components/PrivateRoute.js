import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import fire from "../config/FireBase";

const currentUserStatus = () => {
  fire.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('current user: ', user)
    } else {
      // No user is signed in.
      console.log('No user')

    }
  });
}

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={routeProps =>
        !currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/SignIn"} />
        )
      }
    />
  );
};


export default PrivateRoute