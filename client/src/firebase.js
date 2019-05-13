import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "AIzaSyBP5NJqxS0BLTJYaAEuBBAB4DUAoEaPfi0",
    authDomain: "react-slack-clone-7624c.firebaseapp.com",
    databaseURL: "https://react-slack-clone-7624c.firebaseio.com",
    projectId: "react-slack-clone-7624c",
    storageBucket: "react-slack-clone-7624c.appspot.com",
    messagingSenderId: "696346238101"
  };
  firebase.initializeApp(config);

  export default firebase;