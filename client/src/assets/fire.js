import firebase from 'firebase/app';
import 'firebase/auth'; 

var firebaseConfig = {
    apiKey: "AIzaSyCr7PmREwJ4SGgfH0-5jZiW5es-b5IZY9s",
    authDomain: "cosmic-login.firebaseapp.com",
    databaseURL: "https://cosmic-login.firebaseio.com",
    projectId: "cosmic-login",
    storageBucket: "cosmic-login.appspot.com",
    messagingSenderId: "172995477214",
    appId: "1:172995477214:web:4bd70f7473358d70328c4f"
  };

const fire = firebase.initializeApp(firebaseConfig);

export default fire;