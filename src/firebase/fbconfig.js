import firebase from "firebase";
import "firebase/firestore";
import  "firebase/auth"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCgbS6KTgronBecgxM3L5X0j7RnpvvDpjY",
  authDomain: "movie-project-76dbe.firebaseapp.com",
  databaseURL: "https://movie-project-76dbe.firebaseio.com",
  projectId: "movie-project-76dbe",
  storageBucket: "movie-project-76dbe.appspot.com",
  messagingSenderId: "569367411169",
  appId: "1:569367411169:web:b5ede959d3f87401323aa0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  let db=firebase.firestore()
  let auth=firebase.auth()

  export {db, auth}