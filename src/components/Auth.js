import React, { useEffect, useState } from "react";
import fire from "firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
      fire.auth().onAuthStateChanged(function(user) {
        if (user.uid) {
          // User is signed in.
          console.log('current user: ', user.uid)
        } else {
          // No user is signed in.
          console.log('No user')
    
        }
      })
    },setCurrentUser, []);
  
    return (
      <AuthContext.Provider
        value={{
          currentUser
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
   
