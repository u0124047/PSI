import firebase from 'firebase/app';

import 'firebase/auth';        // for authentication
import 'firebase/storage';     // for storage
import 'firebase/database';    // for realtime database
import 'firebase/firestore';   // for cloud firestore
import 'firebase/messaging';   // for cloud messaging
import 'firebase/functions';   // for cloud functions

let firebaseConfig = {
    apiKey: "AIzaSyAsy6VJQt_jJZNuozgH1S87F1iOMr3IGgE",
    authDomain: "purchasesalesinventory.firebaseapp.com",
    databaseURL: "https://purchasesalesinventory-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "purchasesalesinventory",
    storageBucket: "purchasesalesinventory.appspot.com",
    messagingSenderId: "271310288542",
    appId: "1:271310288542:web:e3b2000a5ec7c76656ed8f",
    measurementId: "G-5XR1MG10V8"
}

// 確認firebase是否準備初始化
if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();