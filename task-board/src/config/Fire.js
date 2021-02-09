import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBb5dVU1QiTZh-M6eny1tFZF9sxk70BKwA",
  authDomain: "fir-e465f.firebaseapp.com",
  databaseURL: "https://fir-e465f.firebaseio.com",
  projectId: "fir-e465f",
  storageBucket: "fir-e465f.appspot.com",
  messagingSenderId: "563117939602",
};

firebase.initializeApp(config);

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
