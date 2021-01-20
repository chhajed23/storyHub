import firebase from 'firebase'
require("@firebase/firestore")

var firebaseConfig = {
  apiKey: "AIzaSyDHsMWfw1M-CnNPCc-yAmWLwRjGHoW17l4",
  authDomain: "story-hub-c34d1.firebaseapp.com",
  projectId: "story-hub-c34d1",
  storageBucket: "story-hub-c34d1.appspot.com",
  messagingSenderId: "715545217011",
  appId: "1:715545217011:web:8ae846ab859011ae403486"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();