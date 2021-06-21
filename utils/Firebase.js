import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyAFL7aGFHP7Chz4d8W00-AWKvYXN937psg",
  authDomain: "hardwarestorestock.firebaseapp.com",
  databaseURL: "https://hardwarestorestock.firebaseio.com",
  projectId: "hardwarestorestock",
  storageBucket: "hardwarestorestock.appspot.com",
  messagingSenderId: "463081255449",
  appId: "1:463081255449:web:9fe5ebe97f9d677d3bf088",
  measurementId: "G-SHP6N8T64C"
};
  // Initialize Firebase
let app;
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}else {
  firebase.app(); // if already initialized, use that one
}
const FirebaseClient = firebase.firestore(app);
module.exports = {
  FirebaseClient,
}