import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyCIghz68C1B68vvOxLTUjWuo13dCqLI-Wk",
    authDomain: "e-clone-7f6a3.firebaseapp.com",
    projectId: "e-clone-7f6a3",
    storageBucket: "e-clone-7f6a3.appspot.com",
    messagingSenderId: "264184395743",
    appId: "1:264184395743:web:08b04ceaa847b512a2f66a",
    measurementId: "G-VBKSYTWW38"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db,auth}