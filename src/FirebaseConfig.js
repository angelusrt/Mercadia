import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCOO7M167h_SwHbcddZ011VCWYHBd4ehR4",
  authDomain: "mercadia-43fd6.firebaseapp.com",
  databaseURL: "https://mercadia-43fd6-default-rtdb.firebaseio.com",
  projectId: "mercadia-43fd6",
  storageBucket: "mercadia-43fd6.appspot.com",
  messagingSenderId: "481419776334",
  appId: "1:481419776334:web:6d0c135d0cfdd068c94e1f",
  measurementId: "G-1YB1VXQTS6"
};

const fire = firebase.default.initializeApp(firebaseConfig)

export default fire;