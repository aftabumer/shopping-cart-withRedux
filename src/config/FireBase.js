import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAYCmzCv38Ixyqb_GbgZ5L4UG5PuEkcstE",
    authDomain: "shopping-cart-dee6b.firebaseapp.com",
    databaseURL: "https://shopping-cart-dee6b.firebaseio.com",
    projectId: "shopping-cart-dee6b",
    storageBucket: "",
    messagingSenderId: "515936812302",
    appId: "1:515936812302:web:66d0bef6a5fe4549"
  };
  const fire = firebase.initializeApp(config);
  export default fire