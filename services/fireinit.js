import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyAsy6VJQt_jJZNuozgH1S87F1iOMr3IGgE",
  databaseURL: "https://purchasesalesinventory-default-rtdb.asia-southeast1.firebasedatabase.app",
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase
