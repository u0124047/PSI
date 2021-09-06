import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyAsy6VJQt_jJZNuozgH1S87F1iOMr3IGgE",
  authDomain: "purchasesalesinventory.firebaseapp.com",
  databaseURL: "https://purchasesalesinventory-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "purchasesalesinventory",
  storageBucket: "purchasesalesinventory.appspot.com",
  messagingSenderId: "271310288542",
  appId: "1:271310288542:web:e3b2000a5ec7c76656ed8f",
  measurementId: "G-5XR1MG10V8"
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase
