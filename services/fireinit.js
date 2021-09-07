import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyDLrS-F2MUDWLd8wLrSQl7yjdNtg5iaPa8",
  databaseURL: "https://purchasesalesinventory-default-rtdb.asia-southeast1.firebasedatabase.app",
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase
