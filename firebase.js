// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDwhDY57YlQJwFfrRZhMUjIP2n7K4ZtN0g",
  authDomain: "clone-e12c8.firebaseapp.com",
  projectId: "clone-e12c8",
  storageBucket: "clone-e12c8.appspot.com",
  messagingSenderId: "5258656953",
  appId: "1:5258656953:web:954f5f4c09df8dc71fef68",
  measurementId: "G-MHM7N4493C",
};

// Double check if there is double initialization of the app
// const app = !firebase.app.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();

const app = firebase.initializeApp(firebaseConfig);

// const app = firebase.app()
//   ? firebase.app()
//   : firebase.initializeApp(firebaseConfig);

const db = app.firestore();

export default db;
