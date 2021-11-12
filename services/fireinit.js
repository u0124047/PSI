import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

let config = {
  apiKey: "AIzaSyAUHjJGgTh5tBbRCAjmjhllORJHqXSrZOA",
  databaseURL: "https://purchasesalesinventory-default-rtdb.asia-southeast1.firebasedatabase.app",
}

!firebase.apps.length ? firebase.initializeApp(config) : ''
export const auth = firebase.auth()
export const DB = firebase.database()
export default firebase
